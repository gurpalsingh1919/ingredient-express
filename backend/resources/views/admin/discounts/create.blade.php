@extends('admin.layout.admin-app')

@section('content')
    <style>
        .card {
            margin-bottom: 20px;
            border-radius: 12px;
            box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.05);
        }

        .card-body {
            padding: 1.5rem;
        }

        .section-title {
            font-weight: 600;
            margin-bottom: 15px;
            color: #444;
            border-bottom: 1px solid #eee;
            padding-bottom: 5px;
        }

        .form-actions {
            text-align: right;
            margin-top: 25px;
        }

        .form-check-label {
            margin-left: 5px;
            font-weight: 500;
            color: #555;
        }

        .form-check {
            margin-bottom: 10px;
        }

        .btn-primary {
            padding: 8px 25px;
            border-radius: 8px;
        }

        .input-group .btn {
            border-radius: 0 8px 8px 0;
        }

        .input-group input {
            border-radius: 8px 0 0 8px;
        }
    </style>

    <div id="content" class="main-content">
        <div class="container mt-4">
            <h4 class="mb-4">🎟️ Create Discount</h4>

            <form>
                <!-- Discount Code Section -->
                <div class="card">
                    <div class="card-body">
                        <h6 class="section-title">Discount Code</h6>

                        <div class="form-group">
                            <label for="discount_code_input">Code</label>
                            <div class="input-group">
                                <input type="text" id="discount_code_input" class="form-control"
                                    placeholder="Enter discount code">
                                <div class="input-group-append">
                                    <button class="btn btn-outline-primary" type="button" id="generate_code">
                                        Generate
                                    </button>
                                </div>
                            </div>
                            <small class="form-text text-muted">
                                Customers must enter this code at checkout.
                            </small>
                        </div>
                    </div>
                </div>

                <!-- Discount Value -->
                <div class="card">
                    <div class="card-body">
                        <h6 class="section-title">Discount Value</h6>

                        <div class="form-group">
                            <div class="form-inline">
                                <select id="discount_value" class="form-control mr-2">
                                    <option value="percentage" selected>Percentage</option>
                                    <option value="fixed">Fixed amount</option>
                                </select>
                                <input type="text" class="form-control" id="discount_input" placeholder="00%" />
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="applies_to">Applies to</label>
                            <select id="applies_to" class="form-control">
                                <option value="all">Specific Collections</option>
                                <option value="specific">Specific Products</option>
                            </select>
                            <input type="text" class="form-control mt-2" placeholder="Search products">
                        </div>
                    </div>
                </div>

                <!-- Eligibility -->
                <div class="card">
                    <div class="card-body">
                        <h6 class="section-title">Eligibility</h6>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="eligibility" id="all_customers" checked>
                            <label class="form-check-label" for="all_customers">All customers</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="eligibility" id="customer_segments">
                            <label class="form-check-label" for="customer_segments">Specific customer segments</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="eligibility" id="specific_customers">
                            <label class="form-check-label" for="specific_customers">Specific customers</label>
                        </div>
                    </div>
                </div>

                <!-- Minimum Purchase -->
                <div class="card">
                    <div class="card-body">
                        <h6 class="section-title">Minimum Purchase Requirements</h6>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="minimum" id="no_min" checked>
                            <label class="form-check-label" for="no_min">No minimum requirements</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="minimum" id="min_amount">
                            <label class="form-check-label" for="min_amount">Minimum purchase amount ($)</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="minimum" id="min_items">
                            <label class="form-check-label" for="min_items">Minimum quantity of items</label>
                        </div>
                    </div>
                </div>

                <!-- Maximum Discount Uses -->
                <div class="card">
                    <div class="card-body">
                        <h6 class="section-title">Maximum Discount Uses</h6>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="limit_total">
                            <label class="form-check-label" for="limit_total">
                                Limit number of times this discount can be used in total
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="limit_per_customer">
                            <label class="form-check-label" for="limit_per_customer">
                                Limit to one use per customer
                            </label>
                        </div>
                    </div>
                </div>

                <!-- Combinations -->
                <div class="card">
                    <div class="card-body">
                        <h6 class="section-title">Combinations</h6>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="product_discount">
                            <label class="form-check-label" for="product_discount">Product discounts</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="order_discount">
                            <label class="form-check-label" for="order_discount">Order discounts</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="shipping_discount">
                            <label class="form-check-label" for="shipping_discount">Shipping discounts</label>
                        </div>
                    </div>
                </div>

                <!-- Active Dates -->
                <div class="card">
                    <div class="card-body">
                        <h6 class="section-title">Active Dates</h6>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="start_date">Start date</label>
                                <input type="date" class="form-control" id="start_date">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="start_time">Start time (EDT)</label>
                                <input type="time" class="form-control" id="start_time">
                            </div>
                        </div>

                        <div class="form-check mb-2">
                            <input class="form-check-input" type="checkbox" id="end_date_set">
                            <label class="form-check-label" for="end_date_set">Set end date</label>
                        </div>

                        <div id="end_date_section" style="display: none;">
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label for="end_date">End date</label>
                                    <input type="date" class="form-control" id="end_date">
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="end_time">End time (EDT)</label>
                                    <input type="time" class="form-control" id="end_time">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Save Button -->
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">💾 Save Discount</button>
                </div>
            </form>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script>
        function generateRandomCode(length = 12) {
            let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
        }

        document.getElementById('generate_code').addEventListener('click', () => {
            document.getElementById('discount_code_input').value = generateRandomCode();
        });

        document.getElementById('end_date_set').addEventListener('change', function () {
            document.getElementById('end_date_section').style.display = this.checked ? 'block' : 'none';
        });

        const discountType = document.getElementById('discount_value');
        const discountInput = document.getElementById('discount_input');

        function formatInput() {
            let rawValue = discountInput.value.replace(/[^0-9.]/g, '');
            if (discountType.value === 'percentage') {
                discountInput.value = rawValue ? parseInt(rawValue) + '%' : '';
            } else {
                discountInput.value = rawValue ? '$ ' + parseFloat(rawValue).toFixed(2) : '';
            }
        }

        discountType.addEventListener('change', function () {
            discountInput.value = '';
            discountInput.placeholder = this.value === 'percentage' ? "00%" : "$ 00.00";
        });

        discountInput.addEventListener('input', formatInput);
        discountInput.addEventListener('blur', formatInput);
    </script>
@endsection