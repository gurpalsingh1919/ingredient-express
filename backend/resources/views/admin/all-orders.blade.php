@extends('admin.layout.admin-app')

@section('content')
    <div id="content" class="main-content">
        <div class="container mt-4">
            <div class="page-header mb-4">
                <h3 class="mb-0">📩 All Orders</h3>
                <small class="text-muted">Complete list of orders from all users</small>
            </div>

            @if($orders->isEmpty())
                <div class="alert alert-info">No Order History found.</div>
            @else
                <div class="card shadow-sm border-0">
                    <div class="card-body">
                        <table class="table table-bordered table-striped table-hover align-middle" id="html5-extension">
                            <thead class="thead-dark text-center">
                                <tr>
                                    <th>#</th>
                                    <th>User</th>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Total Price</th>
                                    <th>Payment ID</th>
                                    <th>Payment Status</th>
                                    <th>Order Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach($orders as $index => $order)
                                    @foreach($order->orderItems as $item)
                                        <tr>
                                            @if($loop->first)
                                                <td rowspan="{{ $order->orderItems->count() }}" class="text-center fw-bold">
                                                    {{ $order->id }}
                                                </td>
                                                <td rowspan="{{ $order->orderItems->count() }}" class="text-center">
                                                    {{ $order->user->name ?? 'N/A' }}
                                                </td>
                                            @endif
                                            <td>{{ $item->product->title ?? 'N/A' }}</td>
                                            <td class="text-center">{{ $item->quantity }}</td>
                                            <td class="text-end">${{ number_format($item->price * $item->quantity, 2) }}</td>
                                            @if($loop->first)
                                                <td rowspan="{{ $order->orderItems->count() }}" class="text-center">
                                                    <span class="badge bg-info text-dark">{{ $order->payment_id }}</span>
                                                </td>
                                                <td rowspan="{{ $order->orderItems->count() }}" class="text-center">
                                                    @if($order->payment_status == 'completed')
                                                        <span class="badge bg-success">Completed</span>
                                                    @elseif($order->payment_status == 'pending')
                                                        <span class="badge bg-warning text-dark">Pending</span>
                                                    @else
                                                        <span class="badge bg-danger">{{ ucfirst($order->payment_status) }}</span>
                                                    @endif
                                                </td>
                                                <td rowspan="{{ $order->orderItems->count() }}" class="text-center">
                                                    {{ $order->created_at->format('d M Y, h:i A') }}
                                                </td>
                                            @endif
                                        </tr>
                                    @endforeach
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            @endif
        </div>
    </div>
@endsection