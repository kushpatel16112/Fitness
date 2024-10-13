import React from 'react';
import '../styles/Footer.css'
function Footer() {

    return(
        <>
            <footer class="footer">

                <section class="flex">

                    <div class="box">
                        <a href="tel:9512019554"><i class="fas fa-phone"></i><span>9512019554</span></a>
                        <a href="tel:1111111111"><i class="fas fa-phone"></i><span>1111111111</span></a>
                        <a href="mailto:kushpatel16112@gmail.com"><i class="fas fa-envelope"></i><span>kushpatel16112@gmail.com</span></a>
                        <a href="#"><i class="fas fa-map-marker-alt"></i><span>ahemdabad</span></a>
                    </div>

                    <div class="box">
                        <a href="/"><span>home</span></a>
                        <a href="/programm"><span>programm</span></a>
                        <a href="/challenges"><span>challenges</span></a>
                        <a href="/about"><span>about</span></a>
                        <a href="/contact"><span>contact</span></a>
                    </div>

                    <div class="box">
                        <a href="#"><span>facebook</span><i class="fab fa-facebook-f"></i></a>
                        <a href="#"><span>twitter</span><i class="fab fa-twitter"></i></a>
                        <a href="#"><span>linkedin</span><i class="fab fa-linkedin"></i></a>
                        <a href="#"><span>instagram</span><i class="fab fa-instagram"></i></a>
                    </div>

                </section>

                <div class="credit">@ created by <span>Kush Patel</span> | thank you!</div>

            </footer>
        </>
    )
}

export default Footer;