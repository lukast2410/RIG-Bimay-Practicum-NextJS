import Head from 'next/head'
import Particle from 'react-particles-js'
import styles from '../../styles/Login.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

export default function Login(){
    return (
        <div className={styles.loginApp}>
            <Particle className={styles.particlesJS}
                params={{
                    "particles": {
                      "number": {
                        "value": 40,
                        "density": {
                          "enable": true,
                          "value_area": 800
                        }
                      },
                      "color": {
                        "value": "#ffffff"
                      },
                      "shape": {
                        "type": "circle",
                        "stroke": {
                          "width": 0,
                          "color": "#000000"
                        },
                        "polygon": {
                          "nb_sides": 5
                        },
                        "image": {
                          "src": "img/github.svg",
                          "width": 100,
                          "height": 100
                        }
                      },
                      "opacity": {
                        "value": 0.5,
                        "random": false,
                        "anim": {
                          "enable": false,
                          "speed": 1,
                          "opacity_min": 0.1,
                          "sync": false
                        }
                      },
                      "size": {
                        "value": 2,
                        "random": true,
                        "anim": {
                          "enable": false,
                          "speed": 100,
                          "size_min": 0.1,
                          "sync": false
                        }
                      },
                      "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#ffffff",
                        "opacity": 1,
                        "width": 1
                      },
                      "move": {
                        "enable": true,
                        "speed": 1,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "attract": {
                          "enable": false,
                          "rotateX": 600,
                          "rotateY": 1200
                        }
                      }
                    },
                    "interactivity": {
                      "detect_on": "canvas",
                      "events": {
                        "onhover": {
                          "enable": true,
                          "mode": "grab"
                        },
                        "onclick": {
                          "enable": true,
                          "mode": "bubble"
                        },
                        "resize": true
                      },
                      "modes": {
                        "grab": {
                          "distance": 100,
                          "line_linked": {
                            "opacity": 1
                          }
                        },
                        "bubble": {
                          "distance": 200,
                          "size": 3,
                          "duration": 1,
                          "opacity": 8,
                        },
                        "repulse": {
                          "distance": 0
                        },
                        "push": {
                          "particles_nb": 4
                        },
                        "remove": {
                          "particles_nb": 2
                        }
                      }
                    },
                    "retina_detect": true,
                    "config_demo": {
                      "hide_card": false,
                      "background_color": "#b61924",
                      "background_image": "",
                      "background_position": "50% 50%",
                      "background_repeat": "no-repeat",
                      "background_size": "cover"
                    }
                }}
            />
            <div className={styles.itemCenter}>
                <form name="formLogin" className={styles.formLogin} id="form-login" method="POST" autoComplete="off">
                <i className={styles.CIbanner}></i>
                <span className={styles.logoBinus}></span>

                <div className={styles.loginInputContainer}>
                    <div className={styles.inputControl}>
                        <input name="username" placeholder="Username" tabIndex={1} required autoFocus={true} className={styles.inputComponent}/>
                        <FontAwesomeIcon icon={faUser} className={styles.fa}/>
                    </div>
            
                    <div className={styles.inputControl}>
                        <input name="password" type="password" placeholder="Password" tabIndex={2} required className={styles.inputComponent}/>
                        <FontAwesomeIcon icon={faLock} className={styles.fa}/>
                    </div>
            
                    <button tabIndex={3} className={styles.loginBtn}>Login</button>
                </div>
                </form>
            </div>
            <footer className={styles.textCenter}>
                <div className={styles.desktopFooter}>
                Copyright © 2021 - Research and Development - SLC - Binus University
                </div>
                <div className={styles.mobileFooter}>
                <div className={styles.mobileFooterText}>Copyright © 2021</div>
                <div className={styles.mobileFooterText}>Research and Development</div>
                <div className={styles.mobileFooterText}>SLC - Binus University</div>
                </div>
            </footer>
        </div>
    )
}