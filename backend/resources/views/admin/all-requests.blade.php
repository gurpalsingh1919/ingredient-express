@extends('admin.layout.admin-app')

@section('content')
    <div id="content" class="main-content">
        <div class="container mt-4">
            <div class="page-header mb-4">
                <h3 class="mb-0">📩 All Contact Requests</h3>
                <small class="text-muted">List of all messages submitted from contact form</small>
            </div>

            @if($contacts->isEmpty())
                <div class="alert alert-info">No contact requests found.</div>
            @else
                <div class="card shadow-sm border-0">
                    <div class="card-body">
                        <table class="table table-bordered table-striped" id="html5-extension">
                            <thead class="thead-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Message</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach($contacts as $index => $contact)
                                    <tr>
                                        <td>{{ $index + 1 }}</td>
                                        <td>{{ $contact->full_name }}</td>
                                        <td>{{ $contact->email }}</td>
                                        <td>{{ $contact->phone }}</td>
                                        <td>{{ Str::limit($contact->message, 50) }}</td>
                                        <td>{{ $contact->created_at->format('d M Y H:i') }}</td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            @endif
        </div>
    </div>
@endsection