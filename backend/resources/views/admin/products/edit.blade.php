@extends('admin.layout.admin-app')

@section('content')
    <div id="content" class="main-content">
        <div class="container mt-4">

            <!-- Page Header -->
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h3 class="mb-0">✏️ Edit Product</h3>
                <a href="{{ route('products.index') }}" class="btn btn-outline-secondary btn-sm">
                    <i class="fas fa-arrow-left"></i> Back to Products
                </a>
            </div>

            <!-- Validation Errors -->
            @if($errors->any())
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <ul class="mb-0">
                        @foreach($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                    <button type="button" class="close" data-dismiss="alert"><span>&times;</span></button>
                </div>
            @endif

            @php
                $productCategoryIds = old('categories', $product->categories ? $product->categories->pluck('id')->toArray() : []);
                $productSubCategoryIds = old('sub_categories', $product->subCategories ? $product->subCategories->pluck('id')->toArray() : []);
            @endphp

            <div class="card shadow-sm border-0">
                <div class="card-body">
                    <form action="{{ route('products.up', $product->id) }}" method="POST" enctype="multipart/form-data">
                        @csrf

                        <!-- Title + Vendor -->
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label><strong>Product Title</strong></label>
                                <input type="text" name="title" class="form-control"
                                    value="{{ old('title', $product->title) }}" required>
                            </div>
                            <div class="form-group col-md-6">
                                <label><strong>Vendor</strong></label>
                                <input type="text" name="vendor" class="form-control"
                                    value="{{ old('vendor', $product->vendor) }}">
                            </div>
                        </div>

                        <!-- Application + Category -->
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label><strong>Application</strong></label>
                                <select name="application_id" id="application_id" class="form-control" required>
                                    <option value="" disabled>Select Application</option>
                                    @foreach($applications as $key => $value)
                                        <option value="{{ $key }}" {{ old('application_id', $product->application_id) == $key ? 'selected' : '' }}>
                                            {{ $value }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="form-group col-md-6">
                                <label><strong>Categories</strong></label>
                                <select name="categories[]" id="category_id" class="form-control" multiple size="5">
                                    @foreach($categories as $cat)
                                        <option value="{{ $cat->id }}" {{ in_array($cat->id, $productCategoryIds) ? 'selected' : '' }}>
                                            {{ $cat->name }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                        </div>

                        <!-- Sub Category + Size -->
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label><strong>Sub-Categories</strong></label>
                                <select name="sub_categories[]" id="sub_category_id" class="form-control" multiple size="5">
                                    @foreach($subCategories as $sub)
                                        <option value="{{ $sub->id }}" {{ in_array($sub->id, $productSubCategoryIds) ? 'selected' : '' }}>
                                            {{ $sub->name }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="form-group col-md-6">
                                <label><strong>Size</strong></label>
                                <input type="text" name="size" class="form-control"
                                    value="{{ old('size', $product->size) }}">
                            </div>
                        </div>

                        <!-- Price + Inventory Qty -->
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label><strong>Product Price ($)</strong></label>
                                <input type="number" step="0.01" name="doubled_price" class="form-control"
                                    value="{{ old('doubled_price', $product->doubled_price) }}">
                            </div>
                            <div class="form-group col-md-6">
                                <label><strong>Inventory Quantity</strong></label>
                                <input type="number" name="variant_inventory_qty" class="form-control"
                                    value="{{ old('variant_inventory_qty', $product->variant_inventory_qty) }}">
                            </div>
                        </div>

                        <!-- Images -->
                        <div class="form-group">
                            <label><strong>Product Images</strong></label>
                            <input type="file" name="images[]" class="form-control" multiple>
                            @if($product->images)
                                <div class="mt-3 d-flex flex-wrap">
                                    @foreach(json_decode($product->images, true) as $img)
                                        <div class="mr-2 mb-2">
                                            <img src="{{ asset('img/products/' . $img) }}" class="rounded border" width="70"
                                                height="70">
                                        </div>
                                    @endforeach
                                </div>
                            @endif
                        </div>

                        <!-- Submit -->
                        <div class="text-right">
                            <button type="submit" class="btn btn-success">
                                <i class="fas fa-save"></i> Update Product
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    </div>

    <!-- JS -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
        $(document).ready(function () {
            let currentSubCategories = @json($productSubCategoryIds);

            $('#category_id').on('change', function () {
                let categoryIds = $(this).val();
                let subCategorySelect = $('#sub_category_id');
                subCategorySelect.html('');

                if (!categoryIds || categoryIds.length === 0) return;

                let requests = categoryIds.map(id => $.getJSON('/admin/categories/get-subcategories/' + id));

                $.when.apply($, requests).done(function () {
                    let allSubs = [];

                    if (categoryIds.length === 1) {
                        allSubs = arguments[0];
                    } else {
                        for (let i = 0; i < arguments.length; i++) {
                            allSubs = allSubs.concat(arguments[i][0]);
                        }
                    }

                    // Remove duplicates
                    let uniqueSubs = [];
                    let ids = new Set();
                    allSubs.forEach(sub => {
                        if (!ids.has(sub.id)) {
                            ids.add(sub.id);
                            uniqueSubs.push(sub);
                        }
                    });

                    uniqueSubs.forEach(sub => {
                        let selected = currentSubCategories.includes(sub.id) ? 'selected' : '';
                        subCategorySelect.append('<option value="' + sub.id + '" ' + selected + '>' + sub.name + '</option>');
                    });
                });
            });

            // Trigger change to prefill subcategories
            $('#category_id').trigger('change');
        });
    </script>
@endsection