@extends('admin.layout.admin-app')

@section('content')
<style>
    .card {
        border-radius: 12px;
        box-shadow: 0px 2px 6px rgba(0,0,0,0.08);
        margin-bottom: 20px;
    }

    .card-header {
        background: #f8f9fa;
        border-bottom: 1px solid #eee;
        font-weight: 600;
        font-size: 16px;
        border-radius: 12px 12px 0 0;
    }

    .form-label {
        font-weight: 500;
        color: #444;
    }

    .btn-success {
        padding: 8px 25px;
        border-radius: 8px;
        font-weight: 500;
    }

    .alert ul {
        margin: 0;
        padding-left: 18px;
    }
</style>

<div id="content" class="main-content">
    <div class="container mt-4">
        <div class="card">
            <div class="card-header">
                ➕ Add Category
            </div>
            <div class="card-body">

                @if($errors->any())
                    <div class="alert alert-danger">
                        <ul>
                            @foreach($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif

                <form action="{{ route('categories.store') }}" method="POST" enctype="multipart/form-data">
                    @csrf

                    <!-- Application -->
                    <div class="form-group">
                        <label for="application_id" class="form-label">Application <span class="text-danger">*</span></label>
                        <select name="application_id" id="application_id" class="form-control" required>
                            <option value="" disabled selected>Select Application</option>
                            @foreach($applications as $key => $value)
                                <option value="{{ $key }}" {{ old('application_id') == $key ? 'selected' : '' }}>
                                    {{ $value }}
                                </option>
                            @endforeach
                        </select>
                    </div>

                    <!-- Parent Category -->
                    <div class="form-group">
                        <label for="parent_id" class="form-label">Parent Category (Optional)</label>
                        <select name="parent_id" id="parent_id" class="form-control">
                            <option value="">-- Main Category --</option>
                        </select>
                    </div>

                    <!-- Sub-Parent Category -->
                    <div class="form-group">
                        <label for="sub_parent" class="form-label">Sub-Parent Category (Optional)</label>
                        <input type="text" name="sub_parent" id="sub_parent" class="form-control" 
                               value="{{ old('sub_parent') }}" placeholder="Enter Sub-Parent Name">
                    </div>

                    <!-- Category Name -->
                    <div class="form-group">
                        <label for="name" class="form-label">Category Name <span class="text-danger">*</span></label>
                        <input type="text" name="name" id="name" class="form-control" 
                               value="{{ old('name') }}" placeholder="Enter Category Name" required>
                    </div>

                    <!-- Category Image -->
                    <div class="form-group">
                        <label for="image" class="form-label">Category Image</label>
                        <input type="file" name="image" id="image" class="form-control-file">
                        <small class="form-text text-muted">Upload a representative image (optional).</small>
                    </div>

                    <div class="text-right">
                        <button type="submit" class="btn btn-success">💾 Save Category</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<script src="https://code.jquery.com/jquery-3.7.1.min.js"
        integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
<script>
    $('#application_id').on('change', function () {
        let appId = $(this).val();
        let parentSelect = $('#parent_id');

        parentSelect.html('<option value="">Loading...</option>');

        $.ajax({
            url: '/admin/categories/get-by-application/' + appId,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                parentSelect.html('<option value="">-- Main Category --</option>');
                $.each(data, function (index, category) {
                    parentSelect.append('<option value="' + category.id + '">' + category.name + '</option>');
                });
            },
            error: function () {
                parentSelect.html('<option value="">Error loading categories</option>');
            }
        });
    });
</script>
@endsection
