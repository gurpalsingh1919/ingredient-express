
<div class="sidebar-wrapper sidebar-theme">
    <div id="dismiss" class="d-lg-none"><i class="flaticon-cancel-12"></i></div>
    <nav id="sidebar">

        <ul class="navbar-nav theme-brand flex-row  d-none d-lg-flex">
            <li class="nav-item d-flex">
                <a href="index.html" class="navbar-brand">
                    <img src="{{asset('img/logo/ingredientexpresslogo.avif')}}" class="img-fluid" alt="logo">
                </a>
               
            </li>
            <!-- <li class="nav-item theme-text">
                <a href="index.html" class="nav-link"> Equation </a>
            </li> -->
        </ul>


        <ul class="list-unstyled menu-categories" id="accordionExample">
            <li class="menu">
                <a href="{{ route('admin.dashboard') }}" aria-expanded="true" class="dropdown-toggle">
                    <div class="">
                        <i class="flaticon-computer-6 ml-3"></i>
                        <span>Dashboard</span>
                    </div>

                    <!-- <div>
                        <span class="badge badge-pill badge-secondary mr-2">5</span>
                    </div> -->
                </a>
              
            </li>
            <li class="menu">
                <a href="#products" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
                    <div class="">
                        <i class="flaticon-sun"></i>
                        <span>Products </span>
                    </div>
                    <div>
                        <i class="flaticon-right-arrow"></i>
                    </div>
                </a>
                <ul class="collapse submenu list-unstyled" id="products" data-parent="#accordionExample">
                    <li>
                            <a href="{{ route('products.create') }}"> Add Product</a>
                    </li>
                    <li>
                        <a href="{{ route('products.index') }}"> All Products </a>
                    </li>
                   
                    <!-- <li>
                        <a href="#"> Inactive </a>
                    </li> -->
                   
                </ul>
            </li>
            <li class="menu">
                <a href="#ui-features" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
                    <div class="">
                        <i class="flaticon-elements"></i>
                        <span>Categories</span>
                    </div>
                    <div>
                        <i class="flaticon-right-arrow"></i>
                    </div>
                </a>
                <ul class="collapse submenu list-unstyled" id="ui-features"  data-parent="#accordionExample">
                    <li>
                        <a href="{{ route('categories.create') }}"> Add Categories</a>
                    </li>

                    <li>
                        <a href="{{ route('categories.index') }}"> All Categories</a>
                    </li>
                    <!-- <li>
                        <a href="#"> Inactive Careers </a>
                    </li> -->
                   
                </ul>
            </li>
            <!-- <li class="menu">
                <a href="#discount" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
                    <div class="">
                        <i class="flaticon-elements"></i>
                        <span>Discounts</span>
                    </div>
                    <div>
                        <i class="flaticon-right-arrow"></i>
                    </div>
                </a>
                <ul class="collapse submenu list-unstyled" id="discount"  data-parent="#accordionExample">
                    <li>
                        <a href="{{ route('discount.create') }}"> Add Discount</a>
                    </li>

                    <li>
                        <a href="#"> All Discounts</a>
                    </li>

                   
                </ul>
            </li> -->
            <li class="menu">
                <a href="#orders" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
                    <div class="">
                        <i class="flaticon-elements"></i>
                        <span>Orders</span>
                    </div>
                    <div>
                        <i class="flaticon-right-arrow"></i>
                    </div>
                </a>
                <ul class="collapse submenu list-unstyled" id="orders"  data-parent="#accordionExample">
                    <!-- <li>
                        <a href="{{ route('categories.create') }}"> Add Discount</a>
                    </li> -->

                    <li>
                        <a href="{{ route('admin.orderhistory') }}"> All Orders</a>
                    </li>
                    <!-- <li>
                        <a href="#"> Inactive Careers </a>
                    </li> -->
                   
                </ul>
                
            </li>


                        <li class="menu">
                <a href="#contactreq" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
                    <div class="">
                        <i class="flaticon-elements"></i>
                        <span>Contact Us </span>
                    </div>
                    <div>
                        <i class="flaticon-right-arrow"></i>
                    </div>
                </a>
                <ul class="collapse submenu list-unstyled" id="contactreq"  data-parent="#accordionExample">
                    <!-- <li>
                        <a href="{{ route('categories.create') }}"> Add Discount</a>
                    </li> -->

                    <li>
                        <a href="{{ route('admin.allreq')}}"> All Requests</a>
                    </li>
                    <!-- <li>
                        <a href="#"> Inactive Careers </a>
                    </li> -->
                   
                </ul>
                
            </li>
        </ul>
    </nav>
</div>