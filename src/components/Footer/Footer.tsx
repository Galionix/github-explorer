import s from './footer.module.scss'
import Link from 'next/link';


export const Footer = () => {
    return (
        <footer
            className={` ${s.footer} `}

        >

            <svg width="401"
                height="74.938"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 401 75"
            >

                <g>
                    <title>background</title>
                    <rect fill="none" id="canvas_background" height="76.938" width="403" y="-1" x="-1" />
                </g>
                <g>
                    <title>Layer 1</title>
                    <g id="svg_1">
                        <path id="svg_2" d="m389.01692,52.76896c-1.096,0 -2.191,0 -3.287,-0.004c1.199,-1.008 2.08,-2.479 2.15,-4.607c0.142,-4.26 -2.271,-6.912 -6.623,-7.273c-1.725,-0.147 -3.491,0.485 -4.834,1.72c-1.196,1.104 -1.885,2.532 -1.885,3.915c0,1.727 1.394,3.438 3.311,4.068c2.164,0.714 4.381,-0.113 5.934,-2.211l-2.453,-1.812c-0.531,0.718 -1.4,1.496 -2.525,1.129c-0.785,-0.259 -1.217,-0.913 -1.217,-1.175c0,-0.52 0.347,-1.16 0.902,-1.673c0.718,-0.658 1.629,-0.997 2.514,-0.927c2.738,0.229 3.92,1.507 3.832,4.136c-0.113,3.419 -4.135,3.589 -4.949,3.589c-0.04,0 -0.064,-0.003 -0.1,-0.003c-6.723,0 -16.24,-7.403 -19.414,-9.864c-20.41,-14.782 -53.026,-28.139 -92.505,-7.832c-15.542,7.998 -28.297,12.284 -34.497,13.526c-1.784,0.356 -3.287,0.3 -4.537,0.011c5.281,-0.666 15.251,-3.545 31.67,-13.908c10.728,-6.211 20.303,-10.024 26.273,-10.467l7.583,-0.562l-7.211,-2.401c-0.515,-0.174 -12.571,-3.973 -35.081,7.251c-1.765,-3.453 -6.811,-11.681 -14.891,-11.906l-4.832,-0.135l3.881,2.883c0.095,0.071 9.348,7.078 4.893,15.599c-4.891,9.352 -16.654,9.111 -18.5,9.013c-0.598,-0.651 -1.116,-1.38 -1.525,-2.401c-0.205,-0.518 -0.374,-1.04 -0.512,-1.571c3.709,1.638 8.955,0.938 11.905,-1.701c4.829,-4.322 1.509,-13.996 -4.544,-14.877c-7.719,-1.121 -13.097,5.604 -11.831,13.108c0.262,1.542 0.449,3.112 0.771,4.626c-3.201,-5.68 -4.081,-10.575 -2.592,-14.579c2.316,-6.226 9.724,-8.259 9.8,-8.28c0.465,-0.12 0.78,-0.556 0.756,-1.033c-0.025,-0.48 -0.386,-0.877 -0.859,-0.951c-0.396,-0.06 -0.817,-0.092 -1.249,-0.092c-4.157,0 -9.575,2.854 -12.104,6.96c-1.08,-3.207 -2.002,-7.095 -2.013,-7.144c-0.109,-0.457 -0.518,-0.782 -0.988,-0.782c-0.001,0 -0.005,0 -0.007,0c-0.475,0.003 -0.882,0.332 -0.985,0.796c-1.924,8.655 0.955,17.678 5.039,23.748c-0.385,-0.357 -0.776,-0.711 -1.151,-1.087c-5.538,-5.531 -8.282,-14.095 -7.89,-21.841c0.083,-1.648 -1.441,-2.277 -2.675,-1.909c-1.231,-0.368 -2.757,0.261 -2.675,1.909c0.374,7.403 -2.13,15.62 -7.188,21.113c-0.638,0.692 -1.297,1.354 -1.977,1.998c4.149,-6.073 7.105,-15.188 5.164,-23.932c-0.102,-0.464 -0.513,-0.793 -0.984,-0.796c-0.002,0 -0.006,0 -0.008,0c-0.472,0 -0.882,0.325 -0.988,0.782c-0.013,0.049 -0.934,3.937 -2.015,7.142c-2.527,-4.104 -7.945,-6.958 -12.1,-6.958c-0.434,0 -0.854,0.032 -1.251,0.092c-0.475,0.074 -0.834,0.471 -0.859,0.951c-0.024,0.481 0.29,0.913 0.757,1.037c0.074,0.018 7.46,2.022 9.791,8.262c1.514,4.05 0.603,9.009 -2.688,14.778c0.366,-1.531 0.59,-3.134 0.874,-4.811c1.27,-7.505 -4.11,-14.229 -11.832,-13.108c-6.745,0.983 -8.471,10.07 -4.544,14.877c2.664,3.258 7.986,3.555 11.791,1.655c-0.042,0.233 -0.086,0.467 -0.127,0.69c-0.255,1.358 -0.891,2.401 -1.715,3.328c-1.605,0.092 -13.625,0.463 -18.581,-9.013c-4.433,-8.485 4.514,-15.315 4.893,-15.599l3.883,-2.883l-4.831,0.135c-8.082,0.226 -13.126,8.453 -14.892,11.906c-22.513,-11.224 -34.567,-7.425 -35.079,-7.251l-7.214,2.401l7.582,0.562c5.971,0.442 15.548,4.256 26.223,10.435c16.461,10.389 26.441,13.271 31.728,13.94c-1.253,0.289 -2.756,0.346 -4.542,-0.011c-6.2,-1.242 -18.955,-5.528 -34.499,-13.526c-39.479,-20.307 -72.094,-6.953 -92.545,7.863c-3.127,2.43 -12.648,9.836 -19.415,9.836c-0.003,0 -0.003,0 -0.007,0c-0.199,0 -4.876,0.082 -4.998,-3.589c-0.088,-2.629 1.093,-3.906 3.828,-4.136c0.88,-0.066 1.799,0.269 2.517,0.927c0.556,0.513 0.902,1.153 0.902,1.673c0,0.262 -0.43,0.916 -1.217,1.175c-1.125,0.367 -1.994,-0.411 -2.526,-1.129l-2.451,1.812c1.55,2.098 3.769,2.929 5.931,2.211c1.919,-0.63 3.311,-2.342 3.311,-4.068c0,-1.383 -0.686,-2.812 -1.883,-3.915c-1.345,-1.234 -3.109,-1.864 -4.835,-1.72c-4.351,0.361 -6.766,3.014 -6.624,7.273c0.073,2.128 0.954,3.604 2.151,4.607c-1.095,0.004 -2.191,0.004 -3.288,0.004c-2.693,0 -2.693,4.182 0,4.182c22.477,0 44.952,0 67.427,0c18.127,0 36.178,0.491 54.294,0.88c7.142,0.156 14.382,0.047 21.509,-0.764l0,0.188c15.744,0 27.128,-2.806 34.804,-8.566c6.078,-4.567 8.708,-9.688 8.815,-9.904l-0.801,-0.403c-0.026,0.05 -2.654,5.157 -8.555,9.589c-6.516,4.893 -15.813,7.602 -28.302,8.234c6.073,-1.071 12.018,-2.755 17.694,-5.365c10.311,-4.74 18.803,-13.027 22.163,-23.493c3.364,10.452 11.899,18.545 22.174,23.493c5.333,2.563 10.986,4.229 16.783,5.291c-11.877,-0.743 -20.79,-3.428 -27.094,-8.16c-5.878,-4.418 -7.88,-9.497 -7.899,-9.55l-0.84,0.321c0.084,0.22 2.104,5.366 8.202,9.947c7.674,5.761 19.058,8.566 34.801,8.566l0,-0.103c7.068,0.746 14.241,0.81 21.214,0.679c18.113,-0.329 36.164,-0.88 54.292,-0.88c22.476,0 44.951,0 67.425,0c2.694,0.001 2.694,-4.181 -0.002,-4.181zm-145.197,-17.522c2.979,-5.695 1.248,-11.053 -1.415,-14.888c4.789,3.227 7.513,9.604 7.548,9.688l0.637,1.527l1.47,-0.761c10.051,-5.188 17.985,-7.278 23.668,-8.007c-5.001,1.878 -10.737,4.651 -16.8,8.156c-8.887,5.61 -15.762,8.945 -20.932,10.908c2.235,-1.551 4.29,-3.687 5.824,-6.623zm-102.869,-4.312c-6.03,-3.491 -11.748,-6.254 -16.742,-8.128c5.682,0.731 13.615,2.818 23.661,8.007l1.468,0.758l0.638,-1.524c0.037,-0.085 2.761,-6.462 7.551,-9.688c-2.664,3.835 -4.394,9.192 -1.417,14.888c1.531,2.929 3.584,5.064 5.814,6.618c-5.176,-1.972 -12.066,-5.311 -20.973,-10.931zm43.011,-11.461c2.076,1.404 3.803,3.336 4.449,5.508c0.122,0.41 0.487,0.7 0.913,0.726c0.424,0.014 0.824,-0.22 0.994,-0.608c0.539,-1.249 1.075,-2.855 1.538,-4.404c-0.034,6.293 -2.359,12.447 -5.312,16.861c2.046,-4.816 2.379,-9.115 0.989,-12.832c-0.813,-2.179 -2.125,-3.906 -3.571,-5.251zm-85.191,19.565l-0.04,0.371c-1.129,-0.18 -2.279,-0.229 -3.351,-0.155c-2.672,0.181 -2.688,4.36 0,4.177c2.188,-0.151 6.345,-0.48 5.818,2.887c-0.229,1.475 -1.384,2.26 -2.714,2.681c-2.925,0.927 -6.649,-0.138 -8.984,-2.006c-3.44,-2.755 -2.482,-7.24 0.396,-10.065c3.491,-3.428 10.156,-1.691 14.251,-0.68c13.817,3.414 26.232,10.646 39.923,14.445c1.073,0.301 2.13,0.569 3.181,0.832c-5.802,-0.294 -16.629,-1.353 -26.178,-5.076c-2.206,-0.86 -4.161,-1.677 -6.053,-2.469c-5.754,-2.41 -10.3,-4.313 -16.249,-4.942zm74.344,-3.392c-2.387,-0.368 -3.563,-1.879 -3.625,-4.195c-0.044,-1.681 0.273,-3.849 1.777,-4.86c2.104,-1.418 6.487,-0.197 7.325,2.14c0.358,1.001 0.788,1.974 1.069,2.975c-0.079,0.216 -0.132,0.453 -0.132,0.726c0.004,3.252 -4.085,3.574 -6.414,3.214zm-131.77,8.599c19.718,-14.283 51.219,-27.189 89.322,-7.592c12.748,6.562 23.531,10.647 30.742,12.685c-3.378,0.046 -6.701,-0.259 -10.049,-1.036c-9.674,-2.257 -18.658,-5.868 -27.779,-9.72c-7.234,-3.057 -14.662,-5.847 -22.418,-7.248c-1.257,-0.227 -2.576,-0.382 -3.906,-0.435l0.098,-0.51c-0.762,-0.145 -18.865,-3.498 -35.41,6.381c-5.051,3.018 -7.43,7.131 -6.361,11c0.573,2.077 2.084,3.742 4.273,4.871c-3.317,0.004 -6.634,0.01 -9.954,0.024l0.223,-0.275c-0.017,-0.015 -1.529,-1.281 -1.488,-3.244c0.042,-1.963 1.63,-4.148 4.591,-6.32l-1.758,-2.49l-17.657,11.98l0.271,0.402c-2.032,0.007 -4.063,0.015 -6.096,0.021c4.831,-2.132 9.662,-5.622 13.356,-8.494zm113.008,8.693c-0.955,0.113 -1.913,0.212 -2.874,0.293l-0.013,-0.771c0.963,0.185 1.923,0.341 2.887,0.478zm-81.088,-8.206c-0.74,-0.958 -1.836,-1.616 -3.187,-1.931c0.851,-0.361 1.875,-0.63 2.867,-0.63c1.257,0.011 2.163,0.48 2.766,1.437c1.453,2.298 0.323,4.024 0.227,4.166c-0.621,0.785 -1.343,1.395 -2.098,1.867c0.041,-0.103 0.08,-0.212 0.115,-0.318c0.542,-1.648 0.291,-3.32 -0.69,-4.591zm-26.747,7.942c-2.613,0.007 -5.228,0.017 -7.843,0.027l7.035,-4.771c-0.07,0.382 -0.111,0.769 -0.119,1.149c-0.031,1.454 0.405,2.668 0.927,3.595zm28.206,-0.026c1.286,-0.686 2.556,-1.651 3.631,-3.017c0.106,-0.142 2.556,-3.502 -0.066,-7.651c-1.825,-2.89 -5.423,-3.653 -9.392,-1.994c-0.736,0.311 -4.393,1.963 -3.88,4.169c0.091,0.38 0.53,1.6 2.539,1.486c1.555,-0.103 2.755,0.251 3.297,0.955c0.481,0.626 0.336,1.383 0.206,1.779c-0.3,0.912 -1.386,2.059 -2.286,2.833c-0.664,0.053 -1.085,0.032 -1.1,0.032l-0.099,-0.008c-4.782,0 -8.337,-1.676 -9.052,-4.276c-0.672,-2.43 1.238,-5.333 4.983,-7.569c8.858,-5.291 18.381,-6.508 24.96,-6.572c-1.116,0.694 -2.125,1.596 -2.951,2.767c-5.274,7.449 -0.847,14.895 6.42,17.173c-5.735,-0.057 -11.472,-0.089 -17.21,-0.107zm51.912,0.838c-8.846,-0.301 -17.696,-0.498 -26.548,-0.629c2.28,-0.82 4.148,-2.473 5.017,-4.938c0.871,-2.473 0.45,-4.354 -0.686,-5.726c3.209,0.898 6.279,2.179 9.816,3.66c1.902,0.796 3.871,1.62 6.1,2.49c9.737,3.796 20.495,4.896 26.483,5.21c-6.75,0.334 -13.546,0.157 -20.182,-0.067zm142.627,-16.833c38.104,-19.595 69.604,-6.691 89.281,7.556c3.719,2.897 8.557,6.392 13.381,8.524c-2.025,-0.008 -4.051,-0.015 -6.077,-0.021l0.269,-0.396l-17.658,-11.98l-1.757,2.49c2.943,2.161 4.531,4.333 4.588,6.285c0.059,1.974 -1.429,3.233 -1.496,3.286l0.205,0.251c-3.297,-0.014 -6.589,-0.021 -9.884,-0.028c2.166,-1.128 3.662,-2.783 4.23,-4.85c1.067,-3.869 -1.31,-7.982 -6.36,-11c-16.544,-9.879 -34.647,-6.525 -35.409,-6.381l0.102,0.53c-0.852,0.032 -1.699,0.103 -2.52,0.209c-8.059,1.058 -15.867,4.131 -23.313,7.244c-8.935,3.731 -17.64,7.19 -27.035,9.62c-3.752,0.97 -7.392,1.33 -11.167,1.31c7.21,-2.051 17.942,-6.123 30.62,-12.649zm84.957,11.276l7.021,4.765c-2.607,-0.014 -5.217,-0.024 -7.822,-0.031c0.52,-0.931 0.949,-2.133 0.919,-3.584c-0.006,-0.381 -0.047,-0.768 -0.118,-1.15zm-28.246,1.394c0.036,0.11 0.076,0.22 0.121,0.329c-0.752,-0.467 -1.469,-1.067 -2.08,-1.85c-0.014,-0.018 -1.313,-1.8 0.201,-4.194c0.605,-0.956 1.511,-1.426 2.767,-1.437c0.017,0 0.032,0 0.05,0c0.99,0 1.98,0.272 2.818,0.63c-1.354,0.314 -2.447,0.973 -3.187,1.931c-0.979,1.271 -1.231,2.943 -0.69,4.591zm-24.037,-0.197c-1.354,-0.266 -2.607,-0.966 -3.085,-2.317c-1.297,-3.686 3.442,-3.529 5.696,-3.378c2.69,0.184 2.673,-3.996 0,-4.177c-1.151,-0.082 -2.284,-0.046 -3.355,0.103l-0.034,-0.318c-5.949,0.629 -10.494,2.532 -16.249,4.941c-1.893,0.792 -3.849,1.608 -6.054,2.469c-9.504,3.707 -20.276,4.771 -26.099,5.076c0.623,-0.16 1.245,-0.318 1.875,-0.492c13.869,-3.792 26.471,-10.895 40.365,-14.584c4.486,-1.188 9.918,-2.539 14.219,-0.123c3.732,2.098 4.561,7.347 1.625,10.299c-2.174,2.185 -5.935,3.07 -8.904,2.501zm-53.475,3.356l-0.011,0.679c-0.813,-0.074 -1.625,-0.162 -2.438,-0.258c0.819,-0.124 1.633,-0.262 2.449,-0.421zm-20.757,-26.142c2.137,0.308 2.561,2.543 2.713,4.347c0.194,2.271 -0.488,3.938 -2.758,4.747c-2.393,0.859 -7.263,0.429 -7.261,-3.003c0,-0.088 -0.017,-0.166 -0.024,-0.248c0.21,-1.181 0.537,-2.342 0.963,-3.452c1.022,-2.671 4.021,-2.734 6.367,-2.391zm-18.092,-1.242c0.17,0.389 0.576,0.626 0.994,0.608c0.424,-0.025 0.788,-0.315 0.912,-0.726c0.645,-2.172 2.371,-4.104 4.447,-5.508c-1.445,1.345 -2.757,3.071 -3.572,5.25c-1.389,3.717 -1.054,8.016 0.99,12.828c-2.953,-4.41 -5.274,-10.564 -5.313,-16.854c0.467,1.547 1.002,3.156 1.542,4.402zm43.958,28.427c6.069,-0.343 16.529,-1.479 26.022,-5.182c2.23,-0.87 4.198,-1.694 6.102,-2.49c3.618,-1.514 6.748,-2.818 10.034,-3.714c-0.945,1.273 -1.384,3.004 -1.027,5.288c0.443,2.854 2.71,4.56 5.254,5.4c-8.889,0.136 -17.776,0.341 -26.662,0.658c-6.535,0.232 -13.152,0.377 -19.723,0.04zm54.863,-0.803c2.175,-0.739 4.191,-1.971 5.748,-3.537c3.594,-3.61 3.138,-8.804 0.728,-12.906c-0.893,-1.518 -2.075,-2.64 -3.434,-3.464c6.579,0.068 16.094,1.289 24.947,6.572c3.746,2.236 5.656,5.14 4.984,7.569c-0.717,2.601 -4.27,4.276 -9.053,4.276l-0.095,0.008c-0.017,0 -0.438,0.018 -1.101,-0.032c-0.813,-0.697 -1.967,-1.851 -2.288,-2.833c-0.131,-0.396 -0.276,-1.153 0.204,-1.779c0.543,-0.704 1.745,-1.054 3.297,-0.955c2.012,0.123 2.449,-1.106 2.539,-1.486c0.513,-2.206 -3.143,-3.858 -3.881,-4.169c-3.967,-1.659 -7.563,-0.896 -9.389,1.994c-2.625,4.149 -0.174,7.51 -0.045,7.683c1.049,1.33 2.289,2.277 3.548,2.961c-5.568,0.011 -11.139,0.042 -16.709,0.098z" fill="currentColor" />
                        <path id="svg_3" d="m216.61592,54.04996c-0.994,-0.254 -12.851,-3.552 -15.029,-14.289c-0.127,-0.627 -0.681,-1.079 -1.321,-1.079c-0.003,0 -0.005,0 -0.009,0c-0.647,0.008 -1.196,0.467 -1.315,1.1c-2.078,11.086 -15.104,14.432 -15.289,14.479c-0.709,0.173 -1.15,0.876 -0.999,1.587c0.135,0.634 0.691,1.069 1.315,1.069c0.082,0 0.161,-0.008 0.241,-0.022c4.747,-0.855 10.067,-1.291 15.814,-1.291c9.049,0 16.066,1.098 16.136,1.107c0.078,0.015 0.155,0.018 0.232,0.018c0.744,-0.003 1.342,-0.608 1.342,-1.352c0,-0.662 -0.483,-1.218 -1.118,-1.327zm-16.592,-1.143c-2.582,0 -5.084,0.085 -7.49,0.255c2.936,-1.928 5.957,-4.74 7.756,-8.727c1.858,4.044 4.917,6.846 7.851,8.741c-2.37,-0.156 -5.125,-0.269 -8.117,-0.269z" fill="currentColor" />
                        <circle id="svg_4" r="1.524" cy="50.21296" cx="200.36992" fill="currentColor" />
                    </g>
                </g>
            </svg>




            <ul

            >
                <li>
                    <Link
                        href="/"
                    >
                        <a >Home</a>
                    </Link>
                </li>
                <li>

                    <Link
                        href="/repositories"
                    >
                        <a >Repos</a>
                    </Link>
                </li>

                <li>

                    <Link
                        href="http://dimas.cf/"
                    >
                        <a
                            title="my main site"
                            target="_blank"
                        >Dimas!</a>
                    </Link>
                </li>


            </ul>


        </footer>
    )
}