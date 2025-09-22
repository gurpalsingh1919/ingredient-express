@extends('admin.layout.admin-app')

@section('content')
    <div id="content" class="main-content">
        <div class="container-fluid">
            <div class="page-header">
                <div class="page-title">
                    <h3>Change Password</h3>
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

                        <form method="POST" action="{{ route('admin.changePassword') }}">
                            @csrf

                            <div class="form-group">
                                <label class="font-weight-bold">Current Password</label>
                                <input type="password" class="form-control" name="current_password"
                                    placeholder="Enter current password" required>
                                @error('current_password')
                                    <small class="text-danger">{{ $message }}</small>
                                @enderror
                            </div>

                            <div class="form-group">
                                <label class="font-weight-bold">New Password</label>
                                <input type="password" class="form-control" name="password" placeholder="Enter new password"
                                    required>
                                @error('password')
                                    <small class="text-danger">{{ $message }}</small>
                                @enderror
                            </div>

                            <div class="form-group">
                                <label class="font-weight-bold">Confirm New Password</label>
                                <input type="password" class="form-control" name="password_confirmation"
                                    placeholder="Re-enter new password" required>
                            </div>

                            <button type="submit" class="btn btn-warning btn-rounded px-4">
                                <i class="fas fa-key"></i> Change Password
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection