@extends('admin.layout.admin-app')

@section('content')
    <!-- <h2>Welcome, {{ auth()->user()->name }}</h2> -->
<div id="content" class="main-content">
    <div class="container">
        <div class="page-header">
            <div class="page-title">
                <h3>Dashboard</h3>
            </div>
        </div>
        <div class="row layout-spacing">

            <div class="col-xl-4 mb-xl-0 col-lg-6 mb-4 col-md-6 col-sm-6">
                <div class="widget-content-area  data-widgets br-4">
                    <div class="widget  t-sales-widget">
                        <div class="media">
                            <div class="icon ml-2">
                                 <i class="flaticon-mail-10"></i>
                            </div>
                            <div class="media-body text-right">
                                <p class="widget-text mb-0">Contact us</p>
                                <p class="widget-numeric-value">0</p>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>

            <div class="col-xl-4 mb-xl-0 col-lg-6 mb-4 col-md-6 col-sm-6">
                <div class="widget-content-area  data-widgets br-4">
                    <div class="widget  t-order-widget">
                        <div class="media">
                            <div class="icon ml-2">
                                 <i class="flaticon-elements"></i>
                            </div>
                            <div class="media-body text-right">
                                <p class="widget-text mb-0">Discounts</p>
                                <p class="widget-numeric-value">0</p>
                            </div>
                        </div>
                      
                    </div>
                </div>
            </div>

            <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6 mb-sm-0 mb-4">
                <div class="widget-content-area  data-widgets br-4">
                    <div class="widget  t-customer-widget">
                        <div class="media">
                            <div class="icon ml-2">
                                <i class="flaticon-computer-5"></i>
                            </div>
                            <div class="media-body text-right">
                                <p class="widget-text mb-0"> Products</p>
                                <p class="widget-numeric-value">0</p>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            

           

        </div>
         <div class="row layout-spacing">
             <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6 mb-sm-0 mb-4">
                <div class="widget-content-area  data-widgets br-4">
                    <div class="widget  t-income-widget">
                        <div class="media">
                            <div class="icon ml-2">
                                <i class="flaticon-user-circle"></i>
                            </div>
                            <div class="media-body text-right">
                                <p class="widget-text mb-0"> Orders</p>
                                <p class="widget-numeric-value">0</p>
                            </div>
                        </div>
                        <!-- <p class="widget-total-stats mt-2">0 active applicants</p> -->
                    </div>
                </div>
            </div>

             <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6 mb-sm-0 mb-4">
                
                <div class="widget-content-area p-0 br-4">
                    <div class="widget-content widget-content-area h-100 br-4 p-0 text-center">
                        <div class="row">
                            <div class="col-md-6 col-sm-6 col-12 pr-sm-0">
                                <div class="date br-4">
                                    <div id="month">June</div>
                                    <div id="day">10</div>
                                    <div id="week">Wednesday</div>
                                </div>
                            </div>
                            <div class="col-md-6 col-sm-6 col-12 pl-0">
                                <div class="time">
                                    <p id="hour" class="mb-0">04</p>
                                    <p id="minut" class="mb-0">22</p>
                                    <p id="date" class="mb-0">PM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>                                
            </div>

            <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6 mb-sm-0 mb-4">
                <div class="widget-content widget-content-area h-100 br-4 p-0">
                    <div class="reviews">
                        <!-- <div class="reviews-header">
                            <div class="row">
                                <div class="col-md-12">
                                    <h6>Reviews</h6>
                                </div>
                            </div>
                        </div> -->
                        
                        <div class="reviews-body text-center">
                            <div class="row">
                                <div class="col-md-6 col-6">                                                    
                                    <p class="r-positive-txt">Positive</p>
                                    <img alt="emoji" class="icon-positive mt-2" src="{{asset('admin/assets/img/simple-smile.png')}}">
                                    <p class="r-positive-percentage mb-0 mt-4">78%</p>
                                </div>
                                <div class="col-md-6 col-6">                                                    
                                    <p class="r-negative-txt">Negative</p>
                                    <img alt="emoji" class="icon-positive mt-2" src="{{asset('admin/assets/img/simple-sad-smile.png')}}">
                                    <p class="r-negative-percentage mb-0 mt-4">22%</p>
                                </div>
                               <!--  <div class="col-md-12 mt-4 mb-2">
                                    <button class="btn btn-primary btn-rounded">View Details</button>
                                </div> -->
                            </div>
                        </div>
                    </div>
                </div>                                
            </div>
         </div>

      

       
    </div>
</div>
@endsection