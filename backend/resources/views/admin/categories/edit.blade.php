@extends('admin.layout.admin-app')

@section('content')
    <div id="content" class="main-content">
        <div class="container mt-4">

            <!-- Page Header -->
            <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="page-header mb-4">
                    <h3 class="mb-0">✏️ Edit Category</h3>
                    <small class="text-muted">Update Category details and save changes</small>
                </div>
                <a href="{{ route('categories.index') }}" class="btn btn-secondary">
                    <i class="fas fa-arrow-left"></i> Back
                </a>
            </div>

            <!-- Error Messages -->
            @if($errors->any())
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <ul class="mb-0">
                        @foreach($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            @endif

            <!-- Edit Category Form -->
            <div class="card shadow-sm">
                <div class="card-body">
                    <form action="{{ route('categories.update', $category->id) }}" method="POST"
                        enctype="multipart/form-data">
                        @csrf
                        @method('PUT')

                        <!-- Application -->
                        <div class="form-group">
                            <label><strong>Application</strong></label>
                            <select name="application_id" id="application_id" class="form-control" required>
                                @foreach($applications as $key => $value)
                                    <option value="{{ $key }}" {{ $category->application_id == $key ? 'selected' : '' }}>
                                        {{ $value }}
                                    </option>
                                @endforeach
                            </select>
                        </div>

                        <!-- Parent Category -->
                        <div class="form-group">
                            <label><strong>Parent Category (Optional)</strong></label>
                            <select name="parent_id" id="parent_id" class="form-control">
                                <option value="">-- Main Category --</option>
                                @foreach($mainCategories as $parent)
                                    <option value="{{ $parent->id }}" {{ $category->parent_id == $parent->id ? 'selected' : '' }}>
                                        {{ $parent->name }}
                                    </option>
                                @endforeach
                            </select>
                        </div>

                        <!-- Category Name -->
                        <div class="form-group">
                            <label><strong>Category Name</strong></label>
                            <input type="text" name="name" class="form-control" value="{{ $category->name }}"
                                placeholder="Enter Category Name" required>
                        </div>

                        <!-- Category Image -->
                        <div class="form-group">
                            <label><strong>Category Image</strong></label>
                            <input type="file" name="image" class="form-control">
                            @if($category->image)
                                <div class="mt-3">
                                    <img src="{{ asset('img/categories/' . $category->image) }}" alt="{{ $category->name }}"
                                        class="img-thumbnail" width="100">
                                </div>
                            @endif
                        </div>

                        <!-- Submit Button -->
                        <button type="submit" class="btn btn-success mt-3">
                            <i class="fas fa-save"></i> Update
                        </button>
                    </form>
                </div>
            </div>

        </div>
    </div>
@endsection