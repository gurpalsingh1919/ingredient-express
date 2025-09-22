@extends('admin.layout.admin-app')

@section('content')
    <div id="content" class="main-content">
        <div class="container mt-4">

            <!-- Page Header -->
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h3 class="mb-0">📦 Product Listing</h3>
                <div class="btn-group">
                    <a href="{{ route('products.create') }}" class="btn btn-primary">
                        <i class="fas fa-plus"></i> Add Product
                    </a>
                    <!-- <button class="btn btn-success" data-toggle="modal" data-target="#importModal">
                        <i class="fas fa-file-excel"></i> Import Excel
                    </button> -->
                </div>
            </div>

            <!-- Success Message -->
            @if(session('success'))
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    {{ session('success') }}
                    <button type="button" class="close" data-dismiss="alert">
                        <span>&times;</span>
                    </button>
                </div>
            @endif

            <!-- Product Table -->
            <div class="card shadow-sm border-0">
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-hover table-striped align-middle" id="html5-extension">
                            <thead class="thead-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Images</th>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Size</th>
                                    <th>Price</th>
                                    <th class="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                @forelse($products as $product)
                                    <tr>
                                        <td>{{ $product->id }}</td>
                                        <td>
                                            @if($product->images && $product->images->count() > 0)
                                                @foreach($product->images as $img)
                                                    <img src="{{ asset('img/products/' . $img->image) }}" class="rounded shadow-sm mr-1"
                                                        width="45" height="45" style="object-fit: cover;">
                                                @endforeach
                                            @else
                                                <span class="badge badge-secondary">No Images</span>
                                            @endif
                                        </td>
                                        <td>{{ $product->title }}</td>
                                        <td>
                                            <span class="badge badge-info">
                                                {{ optional($product->category)->name ?? 'N/A' }}
                                            </span>
                                        </td>
                                        <td>
                                            <span class="badge badge-light border">
                                                {{ $product->size ?? '—' }}
                                            </span>
                                        </td>
                                        <td>
                                            <strong class="text-success">
                                                ${{ number_format($product->doubled_price, 2) }}
                                            </strong>
                                        </td>
                                        <td class="text-center">
                                            <a href="{{ route('products.edit', $product->id) }}" class="btn btn-sm btn-warning">
                                                <i class="fas fa-edit"></i> Edit
                                            </a>
                                            <form action="{{ route('products.destroy', $product->id) }}" method="POST"
                                                class="d-inline">
                                                @csrf
                                                <button type="submit" class="btn btn-sm btn-danger"
                                                    onclick="return confirm('Are you sure you want to delete this product?')">
                                                    <i class="fas fa-trash-alt"></i> Delete
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                @empty
                                    <tr>
                                        <td colspan="7" class="text-center text-muted">
                                            No products found.
                                        </td>
                                    </tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <!-- Import Modal -->
    <div class="modal fade" id="importModal" tabindex="-1" role="dialog" aria-labelledby="importModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <form action="{{ route('product.import') }}" method="POST" enctype="multipart/form-data">
                @csrf
                <div class="modal-content shadow">
                    <div class="modal-header bg-dark text-white">
                        <h5 class="modal-title" id="importModalLabel">
                            <i class="fas fa-file-import"></i> Import Products from Excel
                        </h5>
                        <button type="button" class="close text-white" data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label><strong>Select Excel File</strong></label>
                            <input type="file" name="file" class="form-control" accept=".xlsx,.xls,.csv" required>
                            <small class="text-muted">Allowed formats: .xlsx, .xls, .csv</small>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light border" data-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-success">
                            <i class="fas fa-upload"></i> Import
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
@endsection