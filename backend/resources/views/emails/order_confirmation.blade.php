<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Order Confirmation</title>
    <style>
        html,
        body {
            margin: 0 auto !important;
            padding: 0 !important;
            height: 100% !important;
            width: 100% !important;
            font-family: Arial, Helvetica, sans-serif;
            background-color: #f5f5f5;
        }

        * {
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
        }

        table,
        td {
            mso-table-lspace: 0pt !important;
            mso-table-rspace: 0pt !important;
        }

        table.mainTable {
            border-spacing: 0 !important;
            border-collapse: collapse !important;
        }

        table {
            table-layout: fixed !important;
            margin: 0 auto !important;
        }

        img {
            -ms-interpolation-mode: bicubic;
        }

        a {
            text-decoration: none;
        }

        h2 {
            font-size: 17px !important;
            font-weight: bold !important;
            margin: 0;
            padding: 0;
        }

        p {
            font-size: 14px !important;
            color: #414141;
            line-height: 22px;
            margin: 0;
            padding: 0;
            padding-bottom: 0px;
        }

        .mainTable {
            width: 600px;
        }

        .email-container {
            width: 640px;
            background-color: #ffffff;
            margin: 0 auto;
        }

        .productTable td {
            border: 0px solid #fff;
            padding: 5px;
        }

        .headerTableBlock {
            background-color: #f5f5f5;
            color: #000;
        }

        .alternativeRow {
            background-color: #D9E2F3;
        }
    </style>
</head>

<body>
    <table cellspacing="0" align="center" cellpadding="0" border="0" class="email-container">
        <tbody>
            <tr>
                <td style="padding:20px;" bgcolor="#ffffff">
                    <table cellspacing="0" align="center" cellpadding="0" border="0" class="mainTable">
                        <tbody>
                            <!-- Logo -->
                            <tr>
                                <td style="text-align: center; padding:0 0 30px 0; border-bottom:1px solid #000;">
                                    <a href="#"><img
                                            src="https://ingredientsexpress.com/cdn/shop/files/logo_450x@2x.png?v=1614343660"
                                            alt="Logo" width="200" /></a>
                                </td>
                            </tr>

                            <!-- Greeting -->
                            <tr>
                                <td style="padding:10px;">
                                    <h2 style="color:#f77726;">Dear {{ $order->user->name ?? 'Customer' }}</h2>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:0 10px 20px 10px;">
                                    <p>Thank you for trusting us! Your order has been received and is being processed.
                                        Here are the details:</p>
                                </td>
                            </tr>

                            <!-- Order Details -->
                            <tr>
                                <td style="padding:10px;">
                                    <table cellspacing="0" cellpadding="0" border="0" width="100%" class="productTable"
                                        bgcolor="#f5f5f5">
                                        <tbody>
                                            <tr>
                                                <td style="padding:10px;">
                                                    <strong>Order ID</strong><br>
                                                    <p>{{ $order->id }}</p>
                                                </td>
                                                <td style="padding:10px;">
                                                    <strong>Order Cost</strong><br>
                                                    <p>${{ number_format($order->subtotal, 2) }}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding:10px;">
                                                    <strong>Order Date</strong><br>
                                                    <p>{{ $order->created_at->format('d-m-Y') }}</p>
                                                </td>
                                                <td style="padding:10px;">
                                                    <strong>Order Status</strong><br>
                                                    <p>{{ $order->payment_status }}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding:10px;">
                                                    <strong>Billing Address</strong><br>
                                                    <p>
                                                        {{ $order->billing_address->address_line ?? 'N/A' }}<br>
                                                        {{ $order->billing_address->city ?? '' }},
                                                        {{ $order->billing_address->state ?? '' }}
                                                        {{ $order->billing_address->zip ?? '' }}<br>
                                                        {{ $order->billing_address->phone ?? '' }}
                                                    </p>
                                                </td>
                                                <td style="padding:10px;">
                                                    <strong>Shipping Address</strong><br>
                                                    <p>
                                                        {{ $order->shipping_address->address_line ?? 'N/A' }}<br>
                                                        {{ $order->shipping_address->city ?? '' }},
                                                        {{ $order->shipping_address->state ?? '' }}
                                                        {{ $order->shipping_address->zip ?? '' }}<br>
                                                        {{ $order->shipping_address->phone ?? '' }}
                                                    </p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>

                            <!-- Product Items -->
                            <tr>
                                <td style="padding:10px;">
                                    <h3 style="color: #f77726;">List of items:</h3>
                                    <table cellspacing="0" cellpadding="0" border="0" width="100%" class="productTable">
                                        <thead class="headerTableBlock">
                                            <tr>
                                                <td><strong>Product Name</strong></td>
                                                <td style="text-align:center;"><strong>Quantity</strong></td>
                                                <td style="text-align:right;"><strong>Price</strong></td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            @foreach($order->items as $item)
                                                <tr @if($loop->iteration % 2 == 0) class="alternativeRow" @endif>
                                                    <td>{{ $item->product->title ?? 'Product' }}</td>
                                                    <td style="text-align:center;">{{ $item->quantity }}</td>
                                                    <td style="text-align:right;">${{ number_format($item->price, 2) }}</td>
                                                </tr>
                                            @endforeach
                                            <tr>
                                                <td colspan="3" style="padding-top:10px;">
                                                    <table width="100%">
                                                        <tr>
                                                            <td>Subtotal</td>
                                                            <td style="text-align:right;">
                                                                ${{ number_format($order->subtotal, 2) }}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Shipping Charges</td>
                                                            <td style="text-align:right;">
                                                                ${{ number_format($order->shipping_charges, 2) }}</td>
                                                        </tr>
                                                        <tr>
                                                            <td style="border-top:1px solid #000;">Total</td>
                                                            <td style="text-align:right; border-top:1px solid #000;">
                                                                <strong>${{ number_format($order->total, 2) }}</strong>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>

                            <!-- Footer -->
                            <tr>
                                <td style="padding:10px;">
                                    <p>We are excited to deliver your order and will keep you updated. For any
                                        questions, contact us.</p>
                                    <p>Thank you for your support!</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:15px 10px 20px 10px; border-top:1px solid #000;">
                                    <p style="font-size:14px;">Warm Regards,</p>
                                    <p style="font-size:16px;"><strong>Ingredients Express Team</strong></p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</body>

</html>