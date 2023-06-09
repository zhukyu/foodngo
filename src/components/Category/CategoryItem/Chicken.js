import React from 'react'
import '../../../css/Category/Chicken.scss'

function Chicken({active}) {
    return (
        <div className={active === true ? 'Chicken active' : 'Chicken'}>
            <div
                style={{
                    width: 60,
                    height: 60,
                    overflow: "hidden",
                    display: "block",
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 760 760"
                    width={760}
                    height={760}
                    preserveAspectRatio="xMidYMid meet"
                    style={{
                        width: "100%",
                        height: "100%",
                        transform: "translate3d(0px, 0px, 0px)"
                    }}
                >
                    <defs>
                        <clipPath id="__lottie_element_32">
                            <rect width={760} height={760} x={0} y={0} />
                        </clipPath>
                    </defs>
                    <g clipPath="url(#__lottie_element_32)">
                        <g
                            className='g-1'
                            transform="matrix(0.000001754538857312582,0,0,0.000001754538857312582,418.9996643066406,334.0000305175781)"
                            opacity={1}
                            style={{ display: "block" }}
                        >
                            <g
                                opacity={1}
                                transform="matrix(1,0,0,1,189.6909942626953,-1.996000051498413)"
                            >
                                <path
                                    fill="rgb(209,240,246)"
                                    fillOpacity={1}
                                    d=" M142,-219 C37.45199966430664,-253.37600708007812 -105.60299682617188,-197.5050048828125 -179,-139 C-248,-84 -294.2349853515625,-3.194000005722046 -311,56 C-329.6910095214844,121.99600219726562 -337.1820068359375,261.4540100097656 -272,305 C-183.6909942626953,363.9960021972656 -41.691001892089844,366.9960021972656 144,230 C239.28199768066406,159.70399475097656 280,72 282,-16 C284,-104 239.3090057373047,-187.00399780273438 142,-219z"
                                />
                            </g>
                        </g>
                        <g
                            className='g-2'
                            transform="matrix(0.9999999403953552,0,0,0.9999999403953552,163.56202697753906,377.91802978515625)"
                            opacity={1}
                            style={{ display: "block" }}
                        >
                            <g
                                opacity={1}
                                transform="matrix(1,0,0,1,197.03799438476562,133.99099731445312)"
                            >
                                <path
                                    fill="rgb(168,214,223)"
                                    fillOpacity={1}
                                    d=" M-196.3260040283203,35.50199890136719 C-196.3260040283203,44.180999755859375 -203.8470001220703,89.21900177001953 -170.0050048828125,92.44100189208984 C-136.16400146484375,95.66400146484375 -120.04900360107422,68.2699966430664 -68.48100280761719,71.49199676513672 C-16.913000106811523,74.71499633789062 5.35099983215332,144.12399291992188 66.88400268554688,132.72900390625 C153.9040069580078,116.61399841308594 191.50599670410156,81.16100311279297 196.8769989013672,6.494999885559082 C199.69400024414062,-32.64500045776367 164.6479949951172,-84.28500366210938 148.53199768066406,-103.62300109863281 C132.41799926757812,-122.96099853515625 167.4969940185547,-127.75599670410156 93.55500030517578,-132.3419952392578 C19.613000869750977,-136.927001953125 -20.673999786376953,-133.70399475097656 -67.40699768066406,-99.86299896240234 C-114.13999938964844,-66.02100372314453 -143.14700317382812,-43.46099853515625 -160.8730010986328,-22.511999130249023 C-178.60000610351562,-1.562000036239624 -196.3260040283203,29.05699920654297 -196.3260040283203,35.50199890136719z"
                                />
                            </g>
                        </g>
                        <g
                            className='g-3'
                            transform="matrix(0.9998476505279541,-0.01745338924229145,0.01745338924229145,0.9998476505279541,136.72569274902344,305.0015869140625)"
                            opacity={1}
                            style={{ display: "block" }}
                        >
                            <g
                                opacity={1}
                                transform="matrix(1,0,0,1,182.58299255371094,91.33599853515625)"
                            >
                                <path
                                    fill="rgb(179,96,32)"
                                    fillOpacity={1}
                                    d=" M164.43899536132812,-11.857000350952148 C157.18699645996094,-30.05299949645996 182.33299255371094,-48.8849983215332 165.65199279785156,-59.15299987792969 C148.9720001220703,-69.4209976196289 135.22500610351562,-91.08599853515625 106.90899658203125,-76.26200103759766 C78.59100341796875,-61.4370002746582 59.125,-67.84100341796875 29.875999450683594,-67.19999694824219 C0.628000020980835,-66.55999755859375 -32.143001556396484,-70.80899810791016 -64.322998046875,-58.77199935913086 C-96.50399780273438,-46.73400115966797 -139.1999969482422,-36.40700149536133 -156.1199951171875,-18.649999618530273 C-173.0399932861328,-0.8920000195503235 -182.33399963378906,-3.4830000400543213 -177.6840057373047,21.020000457763672 C-173.0330047607422,45.52299880981445 -174.05799865722656,51.832000732421875 -131.25900268554688,67.4280014038086 C-88.45999908447266,83.02300262451172 -45.516998291015625,91.08599853515625 -14.362000465393066,85.35800170898438 C16.792999267578125,79.62999725341797 47.11899948120117,85.64099884033203 69.46700286865234,67.68699645996094 C91.81600189208984,49.73400115966797 110.06099700927734,57.018001556396484 123.70700073242188,52.7599983215332 C137.3520050048828,48.50299835205078 140.28500366210938,37.10599899291992 143.41400146484375,31.138999938964844 C146.54200744628906,25.17099952697754 171.33700561523438,5.455999851226807 164.43899536132812,-11.857000350952148z"
                                />
                            </g>
                            <g
                                opacity={1}
                                transform="matrix(1,0,0,1,129.97300720214844,73.6520004272461)"
                            >
                                <path
                                    fill="rgb(221,120,41)"
                                    fillOpacity={1}
                                    d=" M-13.21399974822998,-2.2750000953674316 C-24.091999053955078,-2.2750000953674316 -36.58100128173828,-2.677999973297119 -31.343000411987305,2.559000015258789 C-26.106000900268555,7.796999931335449 -27.716999053955078,9.810999870300293 -17.645999908447266,9.810999870300293 C-7.573999881744385,9.810999870300293 -9.1850004196167,9.005999565124512 2.9010000228881836,7.796999931335449 C14.987000465393066,6.589000225067139 15.390000343322754,5.380000114440918 23.44700050354004,5.380000114440918 C31.5049991607666,5.380000114440918 37.14500045776367,-3.0810000896453857 27.47599983215332,-5.900000095367432 C17.80699920654297,-8.720999717712402 10.152999877929688,-11.944000244140625 2.0950000286102295,-7.914999961853027 C-5.9629998207092285,-3.885999917984009 -13.21399974822998,-2.2750000953674316 -13.21399974822998,-2.2750000953674316z"
                                />
                            </g>
                            <g
                                opacity={1}
                                transform="matrix(1,0,0,1,89.11399841308594,115.75199890136719)"
                            >
                                <path
                                    fill="rgb(221,119,40)"
                                    fillOpacity={1}
                                    d=" M17.43899917602539,30.694000244140625 C24.011999130249023,28.496000289916992 33.73099899291992,14.656999588012695 24.958999633789062,10.281999588012695 C16.187999725341797,5.9070000648498535 17.43899917602539,8.133000373840332 5.620999813079834,3.8359999656677246 C-6.133999824523926,-0.4390000104904175 -2.7320001125335693,-0.9409999847412109 -3.3320000171661377,-8.345000267028809 C-3.930999994277954,-15.74899959564209 7.85099983215332,-26.125 -0.5960000157356262,-29.761999130249023 C-9.043000221252441,-33.39799880981445 -11.651000022888184,-35.29100036621094 -18.687000274658203,-21.48200035095215 C-25.724000930786133,-7.671999931335449 -32.051998138427734,-3.888000011444092 -26.070999145507812,8.670999526977539 C-20.700000762939453,19.951000213623047 -23.445999145507812,21.39299964904785 -6.732999801635742,28.54599952697754 C9.979000091552734,35.696998596191406 17.43899917602539,30.694000244140625 17.43899917602539,30.694000244140625z"
                                />
                            </g>
                            <g
                                opacity={1}
                                transform="matrix(1,0,0,1,269.3909912109375,56.87799835205078)"
                            >
                                <path
                                    fill="rgb(148,80,27)"
                                    fillOpacity={1}
                                    d=" M-60.79600143432617,18.851999282836914 C-60.79600143432617,18.851999282836914 -38.43600082397461,15.107999801635742 -22.680999755859375,11.25100040435791 C-6.925000190734863,7.394000053405762 4.830999851226807,-3.9639999866485596 23.020000457763672,-5.302000045776367 C41.21099853515625,-6.640999794006348 60.79499816894531,6.908999919891357 60.79499816894531,6.908999919891357 C60.79499816894531,6.908999919891357 42.305999755859375,-22.31100082397461 23.24799919128418,-18.51099967956543 C4.190000057220459,-14.710000038146973 -3.3959999084472656,-5.756999969482422 -15.038000106811523,-1.003000020980835 C-26.68000030517578,3.75 -60.79600143432617,18.851999282836914 -60.79600143432617,18.851999282836914z"
                                />
                                <g opacity={1} transform="matrix(1,0,0,1,0,0)" />
                            </g>
                        </g>
                        <g
                            className='g-4'
                            transform="matrix(1,0,0,1,233.8170166015625,419.9289855957031)"
                            opacity={1}
                            style={{ display: "block" }}
                        >
                            <g
                                opacity={1}
                                transform="matrix(1,0,0,1,292.9100036621094,156.031005859375)"
                            >
                                <path
                                    fill="rgb(0,0,0)"
                                    fillOpacity="0.1"
                                    d=" M-36.38999938964844,5.386000156402588 C-36.38999938964844,5.386000156402588 36.38999938964844,0.22699999809265137 36.38999938964844,0.22699999809265137 C36.38999938964844,0.22699999809265137 -13.208000183105469,-5.386000156402588 -13.208000183105469,-5.386000156402588 C-13.208000183105469,-5.386000156402588 -36.38999938964844,5.386000156402588 -36.38999938964844,5.386000156402588z"
                                    style={{ mixBlendMode: "multiply" }}
                                />
                            </g>
                            <g
                                opacity={1}
                                transform="matrix(1,0,0,1,56.027000427246094,29.82699966430664)"
                            >
                                <path
                                    fill="rgb(0,0,0)"
                                    fillOpacity="0.17"
                                    d=" M-56.027000427246094,23.534000396728516 C-56.027000427246094,23.534000396728516 64.71399688720703,-33.20100021362305 55.527000427246094,-29.667999267578125 C48.09000015258789,-26.808000564575195 15.482000350952148,4.65500020980835 -1.6799999475479126,14.95300006866455 C-18.841999053955078,25.25 -25.707000732421875,29.827999114990234 -25.707000732421875,29.827999114990234 C-25.707000732421875,29.827999114990234 -56.027000427246094,23.534000396728516 -56.027000427246094,23.534000396728516z"
                                />
                            </g>
                        </g>
                        <g
                            className='g-5'
                            transform="matrix(1,0.00022689280740451068,-0.00022689280740451068,1,425.17156982421875,331.89605712890625)"
                            opacity={1}
                            style={{ display: "block" }}
                        >
                            <g
                                opacity={1}
                                transform="matrix(1,0,0,1,104.71800231933594,81.16999816894531)"
                            >
                                <path
                                    fill="rgb(40,54,44)"
                                    fillOpacity={1}
                                    d=" M-8.71399974822998,-80.90499877929688 C-33.678001403808594,-78.75800323486328 -54.63800048828125,-73.5780029296875 -72.7959976196289,-59.9739990234375 C-91.46199798583984,-45.987998962402344 -99.18299865722656,-27.562000274658203 -95.27100372314453,-3.4779999256134033 C-91.80999755859375,17.83300018310547 -85.28399658203125,28.415000915527344 -72.85800170898438,45.645999908447266 C-49.43000030517578,78.13099670410156 -3.359999895095825,80.91899871826172 20.222000122070312,75.09500122070312 C59.28099822998047,65.4469985961914 82.48999786376953,47.803001403808594 92.06700134277344,9.449000358581543 C99.18299865722656,-19.051000595092773 87.62799835205078,-38.52299880981445 67.18299865722656,-54.948001861572266 C51.21200180053711,-67.77999877929688 32.79800033569336,-75.28800201416016 13.145999908447266,-79.27999877929688 C5.081999778747559,-80.91899871826172 -3.361999988555908,-80.552001953125 -8.71399974822998,-80.90499877929688z"
                                />
                            </g>
                            <g
                                opacity={1}
                                transform="matrix(1,0,0,1,105.51300048828125,84.4209976196289)"
                            >
                                <path
                                    fill="rgb(253,252,215)"
                                    fillOpacity={1}
                                    d=" M-90.56500244140625,-13.984999656677246 C-105.26300048828125,-31.591999053955078 -70.82499694824219,-71.22699737548828 -54.013999938964844,-65.00499725341797 C-40.284000396728516,-59.92300033569336 -25.503999710083008,-78.70999908447266 -16.38800048828125,-75.10600280761719 C1.350000023841858,-68.09200286865234 13.437999725341797,-67.4219970703125 27.184999465942383,-70.46099853515625 C41.47999954223633,-73.62100219726562 45.941001892089844,-48.45500183105469 55.2760009765625,-48.94300079345703 C77.11299896240234,-50.08599853515625 75.37699890136719,-36.03799819946289 85.9489974975586,-25.149999618530273 C105.26300048828125,-5.25600004196167 -13.1850004196167,78.70999908447266 -90.56500244140625,-13.984999656677246z"
                                />
                            </g>
                            <g
                                opacity={1}
                                transform="matrix(1,0,0,1,87.6709976196289,57.244998931884766)"
                            >
                                <path
                                    fill="rgb(87,163,167)"
                                    fillOpacity={1}
                                    d=" M-4.973999977111816,-3.86899995803833 C-4.973999977111816,-3.86899995803833 3.86899995803833,-4.421000003814697 3.86899995803833,-4.421000003814697 C3.86899995803833,-4.421000003814697 4.973999977111816,1.656999945640564 4.973999977111816,1.656999945640564 C4.973999977111816,1.656999945640564 -2.2100000381469727,4.421000003814697 -2.2100000381469727,4.421000003814697 C-2.2100000381469727,4.421000003814697 -4.973999977111816,-3.86899995803833 -4.973999977111816,-3.86899995803833z"
                                />
                            </g>
                            <g
                                opacity={1}
                                transform="matrix(1,0,0,1,106.25599670410156,64.08399963378906)"
                            >
                                <path
                                    fill="rgb(87,163,167)"
                                    fillOpacity={1}
                                    d=" M-3.5230000019073486,-2.740000009536743 C-3.5230000019073486,-2.740000009536743 2.740000009536743,-3.131999969482422 2.740000009536743,-3.131999969482422 C2.740000009536743,-3.131999969482422 3.5230000019073486,1.1749999523162842 3.5230000019073486,1.1749999523162842 C3.5230000019073486,1.1749999523162842 -1.5670000314712524,3.131999969482422 -1.5670000314712524,3.131999969482422 C-1.5670000314712524,3.131999969482422 -3.5230000019073486,-2.740000009536743 -3.5230000019073486,-2.740000009536743z"
                                />
                            </g>
                            <g
                                opacity={1}
                                transform="matrix(1,0,0,1,112.81900024414062,53.099998474121094)"
                            >
                                <path
                                    fill="rgb(87,163,167)"
                                    fillOpacity={1}
                                    d=" M-4.421000003814697,-3.5929999351501465 C-4.421000003814697,-3.5929999351501465 -5.5269999504089355,0.8299999833106995 -5.5269999504089355,0.8299999833106995 C-5.5269999504089355,0.8299999833106995 2.7639999389648438,5.803999900817871 2.7639999389648438,5.803999900817871 C2.7639999389648438,5.803999900817871 5.5269999504089355,-3.5929999351501465 5.5269999504089355,-3.5929999351501465 C5.5269999504089355,-3.5929999351501465 -0.0010000000474974513,-5.803999900817871 -0.0010000000474974513,-5.803999900817871 C-0.0010000000474974513,-5.803999900817871 -4.421000003814697,-3.5929999351501465 -4.421000003814697,-3.5929999351501465z"
                                />
                            </g>
                        </g>
                        <g
                            className='g-6'
                            transform="matrix(1,0,0,1,123.06599426269531,404.4289855957031)"
                            opacity={1}
                            style={{ display: "block" }}
                        >
                            <g
                                opacity={1}
                                transform="matrix(1,0,0,1,200.52699279785156,99.57599639892578)"
                            >
                                <path
                                    fill="rgb(209,120,51)"
                                    fillOpacity={1}
                                    d=" M-81.30500030517578,-15.789999961853027 C-97.97599792480469,-13.373000144958496 -122.8239974975586,-1.6009999513626099 -142.82899475097656,1.2999999523162842 C-162.8350067138672,4.199999809265137 -184.56100463867188,4.625999927520752 -190.90899658203125,21.88800048828125 C-197.25900268554688,39.14899826049805 -200.2729949951172,55.926998138427734 -186.23899841308594,68.19000244140625 C-172.20599365234375,80.4540023803711 -159.30299377441406,99.01000213623047 -141.12399291992188,88.2040023803711 C-122.94499969482422,77.39800262451172 -114.93299865722656,81.00199890136719 -92.18299865722656,68.85299682617188 C-69.43299865722656,56.702999114990234 -70.12999725341797,42.50600051879883 -40.768001556396484,47.78099822998047 C-11.406999588012695,53.05699920654297 12.253000259399414,65.96800231933594 34.94499969482422,72.20999908447266 C57.63800048828125,78.4520034790039 88.8270034790039,91.63300323486328 102.22000122070312,71.30799865722656 C115.61499786376953,50.981998443603516 146.86000061035156,45.77199935913086 148.63699340820312,29.854999542236328 C150.41600036621094,13.937000274658203 200.2729949951172,-22.569000244140625 166.3979949951172,-44.893001556396484 C132.52200317382812,-67.21700286865234 130.15499877929688,-60.06399917602539 100.09600067138672,-79.53700256347656 C70.03900146484375,-99.01000213623047 30.7810001373291,-97.40399932861328 4.5329999923706055,-71.81099700927734 C-21.71500015258789,-46.21799850463867 -71.302001953125,-17.239999771118164 -81.30500030517578,-15.789999961853027z"
                                />
                            </g>
                            <g
                                opacity={1}
                                transform="matrix(1,0,0,1,295.87298583984375,92.7979965209961)"
                            >
                                <path
                                    fill="rgb(187,107,45)"
                                    fillOpacity={1}
                                    d=" M14.293000221252441,-41.52899932861328 C15.281000137329102,-36.5890007019043 17.256999969482422,-2.99399995803833 8.36400032043457,7.875 C-0.527999997138977,18.743999481201172 -31.159000396728516,41.470001220703125 -31.159000396728516,41.470001220703125 C-31.159000396728516,41.470001220703125 4.4120001792907715,43.446998596191406 17.256999969482422,24.67300033569336 C30.10300064086914,5.89900016784668 33.066001892089844,-12.875 30.10300064086914,-20.77899932861328 C27.13800048828125,-28.68400001525879 14.293000221252441,-41.52899932861328 14.293000221252441,-41.52899932861328z"
                                />
                            </g>
                            <g
                                opacity={1}
                                transform="matrix(1,0,0,1,294.69000244140625,55.37099838256836)"
                            >
                                <path
                                    fill="rgb(233,133,56)"
                                    fillOpacity={1}
                                    d=" M-98.44000244140625,20.884000778198242 C-87.96499633789062,8.79800033569336 -89.5770034790039,3.9639999866485596 -70.23899841308594,0.7400000095367432 C-50.9010009765625,-2.4820001125335693 -52.512001037597656,1.5460000038146973 -35.590999603271484,-5.704999923706055 C-18.67099952697754,-12.956999778747559 -14.642000198364258,-13.76200008392334 -16.253000259399414,-2.4820001125335693 C-17.865999221801758,8.79800033569336 -19.476999282836914,7.186999797821045 -35.590999603271484,16.049999237060547 C-51.707000732421875,24.913000106811523 -56.54100036621094,13.633000373840332 -67.8219985961914,26.524999618530273 C-79.10199737548828,39.41600036621094 -96.8290023803711,45.05699920654297 -98.44000244140625,37.80500030517578 C-100.0510025024414,30.55299949645996 -98.44000244140625,20.884000778198242 -98.44000244140625,20.884000778198242z M-6.315999984741211,-9.196999549865723 C-3.0929999351501465,-8.123000144958496 8.723999977111816,-11.345000267028809 7.650000095367432,-4.89900016784668 C6.576000213623047,1.5460000038146973 2.2780001163482666,11.21500015258789 -0.9449999928474426,7.992000102996826 C-4.168000221252441,4.769999980926514 2.2780001163482666,14.439000129699707 -4.168000221252441,4.769999980926514 C-10.61400032043457,-4.89900016784668 -6.315999984741211,-9.196999549865723 -6.315999984741211,-9.196999549865723z"
                                />
                            </g>
                        </g>
                        <g
                            className='g-7'
                            transform="matrix(1,0,0,1,456.6189880371094,552.0889892578125)"
                            opacity={1}
                            style={{ display: "block" }}
                        >
                            <g
                                opacity={1}
                                transform="matrix(1,0,0,1,70.81099700927734,15.479000091552734)"
                            >
                                <path
                                    fill="rgb(87,163,167)"
                                    fillOpacity={1}
                                    d=" M-68.69300079345703,2.756999969482422 C-70.01399993896484,1.909000039100647 -70.56099700927734,-13.166000366210938 -68.12699890136719,-14.196999549865723 C-65.69100189208984,-15.227999687194824 51.34000015258789,-13.017999649047852 65.05799865722656,-6.874000072479248 C70.56099700927734,-4.408999919891357 62.7140007019043,13.756999969482422 60.05099868774414,14.491999626159668 C57.388999938964844,15.227999687194824 33.367000579833984,7.39300012588501 -2.572000026702881,5.002999782562256 C-21.101999282836914,3.7709999084472656 -67.37200164794922,3.6050000190734863 -68.69300079345703,2.756999969482422z"
                                />
                            </g>
                        </g>
                        <g
                            className='g-8'
                            transform="matrix(1.0000066757202148,0,0,1.0000066757202148,431.7134094238281,515.878662109375)"
                            opacity={1}
                            style={{ display: "block" }}
                        >
                            <g
                                opacity={1}
                                transform="matrix(1,0,0,1,87.30000305175781,41.32500076293945)"
                            >
                                <path
                                    fill="rgb(255,114,87)"
                                    fillOpacity={1}
                                    d=" M-83.81500244140625,23.23200035095215 C-80.58000183105469,22.302000045776367 75.37799835205078,-39.237998962402344 77.58300018310547,-40.15700149536133 C79.78900146484375,-41.07500076293945 87.05000305175781,-21.802000045776367 86.34200286865234,-19.68199920654297 C85.63400268554688,-17.562999725341797 -71.81400299072266,40.20000076293945 -73.54399871826172,40.637001037597656 C-75.2750015258789,41.07500076293945 -83.13899993896484,28.922000885009766 -83.13899993896484,28.922000885009766 C-83.13899993896484,28.922000885009766 -87.05000305175781,24.163000106811523 -83.81500244140625,23.23200035095215z"
                                />
                            </g>
                        </g>
                    </g>
                </svg>
            </div>
            <span className='title'>Chicken</span>
        </div>
    )
}

export default Chicken