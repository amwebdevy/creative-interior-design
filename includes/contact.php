<?php 

if(isset($_POST['submit'])) {
  $name = $_POST['name'];
  $email = $_POST['email'];
  $message = $_POST['message'];
  $submit = $_POST['submit'];
  
  $errorEmpty = false;
  $errorEmail = false;
  
  /* Validation */
  if(empty($name) || empty($email) || empty($message)) {
    echo "<span class='form-error'>Please fill in all fields!</span>";
    $errorEmpty = true;

  } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "<span class='form-error'>Please enter a valid e-mail address!</span>";
    $errorEmail = true;

  } else {

    $to = 'webmaster@antmercadoweb.x10host.com';

    $subject = 'New Message From Site';
    
    $body = 'A user has contacted you from your website. 


    ----------------------------
    Name: '.$name.'
    Email: '.$email.'
    Message: '.$message.'
    ----------------------------';

    $headers = 'From: <admin@antmercadoweb.x10host.com>' . "\r\n" . 
    'Reply-To: <admin@antmercadoweb.x10host.com>';

    $result = mail($to, $subject, $body, $headers);

    if(!$result) {   
     echo "<span class='form-error'>There was an error, please try again.</span>";

    } else {
      echo "<span class='form-success'>Your message has been sent!</span>";
    }

  }
  
} else {
   echo "<span class='form-error'>There was an error, please try again.</span>";
}

?>

<script>
  
  //JS Validation
  $("#mail-name, #mail-email, #mail-message").removeClass("input-error");
  
  var errorEmpty = "<?php echo $errorEmpty; ?>";
  var errorEmail = "<?php echo $errorEmail; ?>";
  
  if(errorEmpty == true) {
    $("#mail-name, #mail-email, #mail-message").addClass("input-error");
    
  }
  if (errorEmail == true) {
    $("#mail-email").addClass("input-error");
    
  }
  if (errorEmpty == false && errorEmail == false) {
    $("#mail-name, #mail-email, #mail-message").val("");
    
  }
  
</script>

