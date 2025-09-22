@extends('admin.layout.admin-app')

@section('content')
    <div id="content" class="main-content">
        <div class="container-fluid">
            <div class="page-header">
                <div class="page-title">
                    <h3>My Profile</h3>
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <div class="widget-content-area data-widgets br-4 p-4" style="background: #fff;">

                        {{-- Flash Success Message --}}
                        @if(session('success'))
                            <div class="alert alert-success alert-dismissible fade show" role="alert">
                                {{ session('success') }}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        @endif

                        {{-- Flash Error Message --}}
                        @if(session('error'))
                            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                {{ session('error') }}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        @endif

                        <form method="POST" action="{{ route('admin.updateProfile') }}">
                            @csrf

                            <div class="form-group">
                                <label class="font-weight-bold">Name</label>
                                <input type="text" class="form-control" name="name" value="{{ $admin->name }}"
                                    placeholder="Enter your name" required>
                                @error('name')
                                    <small class="text-danger">{{ $message }}</small>
                                @enderror
                            </div>

                            <div class="form-group">
                                <label class="font-weight-bold">Email</label>
                                <input type="email" class="form-control" name="email" value="{{ $admin->email }}"
                                    placeholder="Enter your email" required>
                                @error('email')
                                    <small class="text-danger">{{ $message }}</small>
                                @enderror
                            </div>

                            <button type="submit" class="btn btn-primary btn-rounded px-4">
                                <i class="fas fa-save"></i> Update Profile
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection