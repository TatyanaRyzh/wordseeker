import React from 'react'

const Modal = () => (
<div>
         
     <div className="modalDialog"> 
        <div> 
         <a href="#close" class="close"><b>✖</b></a>
         <h1><b>Hello!</b></h1> 
         <h3><b>Welcome to the Wordseeker &mdash; a reSolve live demo! Introduce yourself (you can do it later).</b></h3>

         <form action="" method="POST">
	        <input type="text" placeholder="  Username">
            </input>  
         </form>
         
         <h4><br></br><br></br><a href="#start" class="start">Start</a></h4>
         </div>
    </div> 
    <div className="Background"> 
        <div> 
        <h5><br></br><b> </b></h5>
        </div>
    </div> 
</div>
)

export default Modal