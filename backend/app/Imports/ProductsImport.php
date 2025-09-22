<?php

namespace App\Imports;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use Illuminate\Contracts\Queue\ShouldQueue;


class ProductsImport implements ToModel, WithHeadingRow, WithChunkReading, ShouldQueue
{
    public function model(array $row)
    {
        $product = Product::create([
            'title' => $row['title'] ?? null,
            'vendor' => $row['vendor'] ?? null,
            'size' => $row['size'] ?? null,
            'price' => $row['product_price'] ?? 0,
            'doubled_price' => $row['doubled_price'] ?? 0,
            'inventory_qty' => $row['variant_inventory_qty'] ?? 0,
        ]);

        // Handle images
        if (!empty($row['product_images_link'])) {
            $imageLinks = explode(',', $row['product_images_link']);

            foreach ($imageLinks as $link) {
                $link = trim($link);
                if (!$link)
                    continue;

                try {
                    // 10s max wait per image
                    $response = Http::timeout(10)->get($link);

                    if ($response->successful()) {
                        $ext = pathinfo(parse_url($link, PHP_URL_PATH), PATHINFO_EXTENSION) ?: 'jpg';
                        $filename = Str::random(8) . '.' . $ext;


                        // Save to /public/img/products/
                        file_put_contents(public_path('img/products/' . $filename), $response->body());

                        ProductImage::create([
                            'product_id' => $product->id,
                            'image' => $filename,
                        ]);
                    }
                } catch (\Exception $e) {
                    \Log::error("Image download failed: {$link} | " . $e->getMessage());
                }
            }
        }

        return $product;
    }

    // Import rows in small chunks
    public function chunkSize(): int
    {
        return 100;
    }
}
