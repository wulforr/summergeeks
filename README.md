# Entry Management

<p>An Entry management system for all the aspiring candidates interviewing at Innovaccer.</p>
Made using
<ul>
<li>ReactJS</li>
<li>NodeJS</li>
<li>Nexmo</li>
</ul>
<h2>Checking In</h2>
<p>When a visitor enters the building, he is asked to fill the CheckIn form</p>
![A image of front page](/images/CheckIn.png)
<p>On mounting of the CheckIn page a request is made to server to get all hosts detail and they are saved in State.</p>
<p>A dropdown is created using this state and the options are name of hosta along with their city, to remove duplicacy</p>

<p>If any of the detail is not filled it displays an error to the visitor</p>
<br>
<p>Once the visitor fills all the details and clicks on checkout button a request is made to the server.</p>
<p>This request has all the details of visitor along with the id of host</p>

<p>On the server all the details of user are stored in the database along with id of host and current time as checkin time. Then it sends a message and email to the host that a new visitor has arrived</p>

<h2>Checking Out</h2>
<p>Once the visitor has finished and is leaving he is asked to fill the checkout form</p>
<p>On mounting of checkout page a request is made to the serverwhich fetches all the current visitors</p>
<p>A dropdown is created using this cnsiting of visitors name and email id, both are provided so that visitor doesnot face any confusion </p>
<p>When he selects the name from dropdown he can click on getotp button which sends a request to server to send a otp to mobile number the visitor selected. This extra security is used so that visitor does not checkout anyone else. The otp is saved to users database</p>
<p>When the visitor clicks Checkout, a request is made to server, which checks otp entered and otp in database upon matching current time is set as checkout time for the visitor. After that an email and message is sent to visitor about his details</p>


<h2>Extra info</h2>
<ul>
  <li>Nodemailer is used for sending email</li>
  <li>Nexmo is used for sending text</li>
  <li>All the api keys are in config folder which is not uploaded on github</li>
  <li>All the screenshots are in images folder</li>
</ul>
