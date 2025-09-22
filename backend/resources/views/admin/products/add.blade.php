@extends('admin.layout.admin-app')

@section('content')
<link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />


<div id="content" class="main-content">
    <div class="container mt-4">

        <!-- Page Header -->
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h3 class="mb-0">➕ Add Product</h3>
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

        <!-- Add Product Form -->
        <div class="card shadow-sm border-0">
            <div class="card-body">
                <form action="{{ route('products.store') }}" method="POST" enctype="multipart/form-data">
                    @csrf

                    <!-- Title + Vendor -->
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label><strong>Product Title</strong></label>
                            <input type="text" name="title" class="form-control"
                                   value="{{ old('title') }}" placeholder="Enter Product Title" required>
                        </div>
                        <div class="form-group col-md-6">
                            <label><strong>Vendor</strong></label>
                            <input type="text" name="vendor" class="form-control"
                                   value="{{ old('vendor') }}" placeholder="Enter Vendor Name">
                        </div>
                    </div>

                    <!-- Application + Category -->
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label><strong>Application</strong></label>
                            <select name="application_id" id="application_id" class="form-control" required>
                                <option value="" disabled selected>Select Application</option>
                                @foreach($applications as $key => $value)
                                    <option value="{{ $key }}" {{ old('application_id') == $key ? 'selected' : '' }}>
                                        {{ $value }}
                                    </option>
                                @endforeach
                            </select>
                        </div>
                        <div class="form-group col-md-6">
                            <label><strong>Categories</strong></label>
                       <select name="categories[]" id="category_id" class="form-control select2" multiple>
                            @foreach($categories as $cat)
                                <option value="{{ $cat->id }}" {{ in_array($cat->id, old('categories', [])) ? 'selected' : '' }}>
                                    {{ $cat->name }}
                                </option>
                            @endforeach
                        </select>
                        <small class="form-text text-muted">Hold CTRL (Windows) or CMD (Mac) to select multiple</small>
                        </div>
                    </div>

                    <!-- Sub Category + Size -->
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label><strong>Sub-Categories</strong></label>
                            <select name="sub_categories[]" id="sub_category_id" class="form-control" multiple>
                                @foreach($subCategories as $sub)
                                    <option value="{{ $sub->id }}" {{ in_array($sub->id, old('sub_categories', [])) ? 'selected' : '' }}>
                                        {{ $sub->name }}
                                    </option>
                                @endforeach
                            </select>
                        </div>
                        <div class="form-group col-md-6">
                            <label><strong>Size</strong></label>
                            <input type="text" name="size" class="form-control"
                                   value="{{ old('size') }}" placeholder="Enter Size (e.g., 500g, 1kg)">
                        </div>
                    </div>

                    <!-- Price + Inventory Qty -->
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label><strong>Product Price ($)</strong></label>
                            <input type="number" step="0.01" name="product_price" class="form-control"
                                   value="{{ old('product_price') }}" placeholder="Enter Price">
                        </div>
                        <div class="form-group col-md-6">
                            <label><strong>Inventory Quantity</strong></label>
                            <input type="number" name="variant_inventory_qty" class="form-control"
                                   value="{{ old('variant_inventory_qty', 0) }}" placeholder="Enter Inventory Quantity">
                        </div>
                    </div>

                    <!-- Images (Last Row) -->
                    <div class="form-group">
                        <label><strong>Product Images</strong></label>
                        <input type="file" name="images[]" class="form-control" multiple>
                        <small class="form-text text-muted">You can select multiple images.</small>
                    </div>

                    <!-- Submit -->
                    <div class="text-right">
                        <button type="submit" class="btn btn-success">
                            <i class="fas fa-save"></i> Save Product
                        </button>
                    </div>
                </form>
            </div>
        </div>

    </div>
</div>

<!-- jQuery for dependent dropdowns -->

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
 <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
<script>

    $('#category_id, #sub_category_id').select2({
    placeholder: "Select options",
    allowClear: true,
    width: '100%'
});
    // Load categories when Application changes
    $('#application_id').on('change', function () {
        let appId = $(this).val();
        let categorySelect = $('#category_id');
        let subCategorySelect = $('#sub_category_id');

        categorySelect.html('<option value="">Loading...</option>');
        subCategorySelect.html('<option value="">-- Select Sub-Category --</option>');

        $.ajax({
            url: '/admin/categories/get-by-application/' + appId,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                categorySelect.html('<option value="">-- Select Category --</option>');
                $.each(data, function (index, category) {
                    categorySelect.append('<option value="' + category.id + '">' + category.name + '</option>');
                });
            },
            error: function () {
                categorySelect.html('<option value="">Error loading categories</option>');
            }
        });
    });

    // Load subcategories when Category changes
$('#category_id').on('change', function () {
    let categoryIds = $(this).val(); // this is an array
    let subCategorySelect = $('#sub_category_id');

    subCategorySelect.html('<option value="">Loading...</option>');

    if (categoryIds && categoryIds.length > 0) {
        // Prepare AJAX requests for each category
        let requests = categoryIds.map(function(catId) {
            return $.ajax({
                url: '/admin/categories/get-subcategories/' + catId,
                type: 'GET',
                dataType: 'json'
            });
        });

        // When all requests complete
        $.when.apply($, requests).done(function() {
            subCategorySelect.html(''); // clear current options

            let allSubCategories = [];

            // Handle both single and multiple responses
            if (categoryIds.length === 1) {
                allSubCategories = arguments[0]; // single array
            } else {
                for (let i = 0; i < arguments.length; i++) {
                    allSubCategories = allSubCategories.concat(arguments[i][0]); // each response in arguments[i][0]
                }
            }

            // Remove duplicate subcategories by id
            let uniqueSubs = [];
            let ids = new Set();
            allSubCategories.forEach(sub => {
                if (!ids.has(sub.id)) {
                    ids.add(sub.id);
                    uniqueSubs.push(sub);
                }
            });

            // Populate subcategory select
            subCategorySelect.append('<option value="">-- Select Sub-Category --</option>');
            uniqueSubs.forEach(sub => {
                let label = sub.sub_parent ? `${sub.name} (${sub.sub_parent})` : sub.name;
                subCategorySelect.append('<option value="' + sub.id + '">' + label + '</option>');
            });

            // Refresh select2
            subCategorySelect.trigger('change');
        }).fail(function() {
            subCategorySelect.html('<option value="">Error loading sub-categories</option>');
        });
    } else {
        subCategorySelect.html('<option value="">-- Select Sub-Category --</option>');
    }
});
</script>
@endsection
