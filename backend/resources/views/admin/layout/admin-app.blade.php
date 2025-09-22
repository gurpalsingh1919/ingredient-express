<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no">
    <title>INGREDIENT EXPRESS</title>
    <link rel="icon" href="{{ asset('img/logo/ingredientexpresslogo.avif') }}" type="image/gif" sizes="16x16">
    <!-- BEGIN GLOBAL MANDATORY STYLES -->
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,700' rel='stylesheet' type='text/css'>
    <link href="{{ asset('admin/bootstrap/css/bootstrap.min.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('admin/assets/css/plugins.css') }}" rel="stylesheet" type="text/css" />
    <!-- END GLOBAL MANDATORY STYLES -->

    <!-- BEGIN PAGE LEVEL PLUGINS/CUSTOM STYLES -->
    <link href="{{ asset('admin/assets/css/support-chat.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('admin/plugins/maps/vector/jvector/jquery-jvectormap-2.0.3.css') }}" rel="stylesheet"
        type="text/css" />
    <!-- <link href="{{ asset('admin/plugins/charts/chartist/chartist.css') }}" rel="stylesheet" type="text/css"> -->
    <link href="{{ asset('admin/assets/css/default-dashboard/style.css') }}" rel="stylesheet" type="text/css" />
    <!-- END PAGE LEVEL PLUGINS/CUSTOM STYLES -->
    <!--  BEGIN CUSTOM STYLE FILE  -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link href="{{ asset('admin/assets/css/classic-dashboard/style.css') }}" rel="stylesheet" type="text/css" />
    <!--  END CUSTOM STYLE FILE  -->
    <!-- BEGIN PAGE LEVEL CUSTOM STYLES -->
    <style>
        .table td,
        .table th {
            border-top: 1px solid #f1f3f1;
        }

        .table-controls>li>a i {
            color: #d3d3d3;
        }
    </style>
    <!-- END PAGE LEVEL CUSTOM STYLES -->
    <!--  BEGIN CUSTOM STYLE FILE  -->
    <link href="{{ asset('admin/plugins/editors/summernote/summernote-bs4.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('admin/plugins/editors/summernote/custom-summernote-bs4.css') }}" rel="stylesheet"
        type="text/css" />
    <!--  BEGIN CUSTOM STYLE FILE  -->
    <!-- BEGIN PAGE LEVEL CUSTOM STYLES -->
    <link rel="stylesheet" type="text/css" href="{{ asset('admin/plugins/table/datatable/datatables.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('admin/plugins/table/datatable/custom_dt_html5.css') }}">
    <!-- END PAGE LEVEL CUSTOM STYLES -->
</head>

<body class="default-sidebar">

    @include('admin.layout.header')


    <!--  BEGIN MAIN CONTAINER  -->
    <div class="main-container" id="container">

        <div class="overlay"></div>
        <div class="cs-overlay"></div>

        <!--  BEGIN SIDEBAR  -->
        @include('admin.layout.left-sidebar')

        <!--  END SIDEBAR  -->

        <!--  BEGIN CONTENT PART  -->

        @yield('content')

        @yield('scripts')
        <!--  END CONTENT PART  -->

    </div>
    <!-- END MAIN CONTAINER -->


    @include('admin.layout.footer')



</body>

</html>