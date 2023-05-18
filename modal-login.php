<!-- Modal -->
<div class="modal fade" id="login-form" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content" style="background-size: cover;
background-color: #eef6fe;
border-radius: 20px;
padding: 5%;
		background-size: cover;">
            <div class="modal-header" style="border-bottom: none;">
                <h5 class="modal-title" id="exampleModalCenterTitle" style="color: #2e7eed;
font-weight: bold;
text-align: center;"></h5>


                <div class="user-login-icon" style="margin: 0 auto;
display: block;">

                    <img src="images/user-icon.png" class="img-responsive" alt="">

                </div>


                <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="padding-left: 0;
margin-left: 6%;">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">


                <form action="user-dashboard.html">
                    <!-- Username -->
                    <input class="form-control main" type="text" placeholder="Username" required="" style="border-radius: 20px;">
                    <!-- Password -->
                    <input class="form-control main" type="password" placeholder="Password" required="" style="border-radius: 20px;">
                    <!-- Submit Button -->
                    <div class="form-row" style="text-align: center;">
                        <!-- Submit Button -->

                        <a href="user-dashboard.html" class="btn btn-rounded-icon btn-comm" style="color: #2e7eed;border: 1px solid #2e7eed; margin: 0 auto; margin-top: 5%;">
                            <i class="ti-mouse"></i>
                            Login
                        </a>



                    </div>

                    <div class="form-row" style="justify-content: center;
margin-top: 3%;
color: #2e7eed;
font-size: 14px;">
                        Forgot password ?
                        <a href=""> &nbsp;Reset here</a>

                    </div>



                </form>



                <form action="user-dashboard.html">
                    <h5 class="modal-title" id="exampleModalCenterTitle" style="color: #2e7eed;
font-size: 16px; margin-bottom: 3.5%; padding-bottom: 4%; text-align: center;
margin-top: 10%;">
                        You can login with mobile number here :</h5>

                    <!-- Username -->
                    <input class="form-control main" type="text" placeholder="+91 **** **** **" required="" style="border-radius: 20px;">
                    <!-- Password -->
                    <input class="form-control main" type="text" placeholder="Enter secure OTP here" required="" style="border-radius: 20px;">
                    <!-- Submit Button -->
                    <div class="form-row" style="text-align: center;">
                        <!-- Submit Button -->


                        <a href="user-dashboard.html" class="btn btn-rounded-icon btn-comm" style="color: #2e7eed;border: 1px solid #2e7eed; margin: 0 auto; margin-top: 5%;">
                            <i class="ti-mouse"></i>
                            Login
                        </a>


                    </div>

                    <div class="form-row" style="justify-content: center;
margin-top: 3%;
color: #2e7eed;
font-size: 14px;">
                        Didn't get the OTP ? <a href=""> &nbsp;Resend in 20s</a>

                    </div>




                </form>





            </div>

        </div>
    </div>
</div>