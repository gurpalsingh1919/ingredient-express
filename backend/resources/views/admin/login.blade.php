<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no">
    <title>INGREDIENT EXPRESS</title>
    <link rel="icon" type="image/x-icon" href="assets/img/favicon.ico"/>
    <!-- BEGIN GLOBAL MANDATORY STYLES -->
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,700' rel='stylesheet' type='text/css'>
    <link href="{{ asset('admin/bootstrap/css/bootstrap.min.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('admin/assets/css/plugins.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('admin/assets/css/users/login-1.css') }}" rel="stylesheet" type="text/css" />
    
    
</head>
<body class="login">
      <form method="POST" action="{{route('admin.login')}}" class="form-login">
         @csrf
    
        <div class="row">
            <div class="col-md-12 text-center mb-4">
                <img alt="logo" src="{{asset('img/logo/ingredientexpresslogo.avif')}}" class="theme-logo">
            </div>
            @if($errors->all())
               @foreach ($errors->all() as $error)
                  <div class="alert alert-danger col-md-12">{{ $error }}</div>
                @endforeach
            @endif
             @if(session('error')) 
            <div class="error alert alert-danger alert-dismissable col-md-12">
              <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
              <strong>Error : </strong>   {{ session('error') }}
            </div>
           
            @endif
            <div class="col-md-12">
                <label for="inputEmail" class="">Email</label>                
                <input type="email" id="Email" class="form-control mb-4 {{ $errors->has('email') ? ' is-invalid' : '' }}" placeholder="email" name="email" value="{{ old('email') }}" required autofocus > 
                  @if ($errors->has('email'))
                      <span class="invalid-feedback" role="alert">
                          <strong>{{ $errors->first('email') }}</strong>
                      </span>
                    @endif
                <label for="inputPassword" class="">Password</label>                
                <input type="password" id="Password" class="form-control mb-5{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" placeholder="Password" required>
                @if ($errors->has('password'))
                      <span class="invalid-feedback" role="alert">
                        <strong>{{ $errors->first('password') }}</strong>
                      </span>
                    @endif             
                <div class="checkbox d-flex justify-content-between mb-4 mt-3">
                    <div class="custom-control custom-checkbox mr-3">
                         <input type="checkbox" class="custom-control-input" id="customCheck1" value="remember-me" name="remember" {{ old('remember') ? 'checked' : '' }}>
                         <label class="custom-control-label" for="customCheck1">Remember</label>
                    </div>
                    
                </div>                
                <button class="btn btn-lg btn-gradient-danger btn-block btn-rounded mb-4 mt-5" type="submit">Login</button>
                
            </div>

            
        </div>
    </form>
    
    <!-- BEGIN GLOBAL MANDATORY SCRIPTS -->
    <script src="{{asset('admin/assets/js/libs/jquery-3.1.1.min.js')}}"></script>
    <script src="{{asset('admin/bootstrap/js/popper.min.js')}}"></script>
    <script src="{{asset('admin/bootstrap/js/bootstrap.min.js')}}"></script>
    
    <!-- END GLOBAL MANDATORY SCRIPTS -->
</body>
</html>