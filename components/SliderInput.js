export default function SliderInput(props) {
    return (
        <div className="slider-input">
            <input
                type="range"
                value={props.value}
                min={props.min}
                max={props.max}
                step={props.step}
                onChange={props.onChange}
            />
            <input
                type="number"
                value={props.value}
                min={props.min}
                max={props.max}
                step={props.step}
                onChange={props.onChange}
            />
            <input
                type="button"
                value="Default"
                onClick={props.setDefault}
            />

            {/*language=CSS*/}
            <style jsx>{`

                /* Wrapper styles */
                .slider-input {
                    display: flex;
                    margin: 20px 0;
                }
                
                /* Button styles */
                input[type="button"] {
                    height: 29px;
                    font-size: 14px;
                    max-width: 80px;
                    border: 1px solid #5d90bc;
                    background: #616f78;
                    border-radius: 4px;
                    margin-left: 12px;
                    padding: 4px 10px;
                    font-family: 'Roboto Mono',monospace;
                    color: white;
                    cursor: pointer;
                    transition: all 0.1s;
                }
                
                input[type="button"]:hover {
                    background: #3d474d;
                }
                
                input[type="button"]:active {
                    background: #000;
                    color: #9cbfd0;
                }
                
                /* Number field styles*/
                input[type="number"] {
                    height: 29px;
                    font-size: 18px;
                    max-width: 80px;
                    border: 1px solid #5d90bc;
                    background: #eef8ff;
                    border-radius: 4px;
                    margin-left: 12px;
                    padding: 4px;
                    font-family: 'Roboto Mono', monospace;
                }
            
                /* Range slider styles */
                input[type="range"] {
                    width: 250px;
                    max-width: 100%;
                    margin: 7.3px 0;
                    background-color: transparent;
                    -webkit-appearance: none;
                }

                input[type="range"]::-webkit-slider-runnable-track {
                    background: rgba(48, 113, 169, 0.78);
                    border: 0.2px solid #010101;
                    border-radius: 1.3px;
                    width: 100%;
                    height: 11.4px;
                    cursor: pointer;
                }

                input[type="range"]::-webkit-slider-thumb {
                    margin-top: -7.5px;
                    width: 26px;
                    height: 26px;
                    background: #ffffff;
                    border: 1.8px solid #00001e;
                    border-radius: 15px;
                    cursor: pointer;
                    -webkit-appearance: none;
                }

                input[type="range"]:focus::-webkit-slider-runnable-track {
                    background: #367ebd;
                }

                input[type="range"]::-moz-range-track {
                    background: rgba(48, 113, 169, 0.78);
                    border: 0.2px solid #010101;
                    border-radius: 1.3px;
                    width: 100%;
                    height: 11.4px;
                    cursor: pointer;
                }

                input[type="range"]::-moz-range-thumb {
                    width: 26px;
                    height: 26px;
                    background: #ffffff;
                    border: 1.8px solid #00001e;
                    border-radius: 15px;
                    cursor: pointer;
                }

                input[type="range"]::-ms-track {
                    background: transparent;
                    border-color: transparent;
                    border-width: 8.2px 0;
                    color: transparent;
                    width: 100%;
                    height: 11.4px;
                    cursor: pointer;
                }

                input[type="range"]::-ms-fill-lower {
                    background: #2a6495;
                    border: 0.2px solid #010101;
                    border-radius: 2.6px;
                }

                input[type="range"]::-ms-fill-upper {
                    background: rgba(48, 113, 169, 0.78);
                    border: 0.2px solid #010101;
                    border-radius: 2.6px;
                }

                input[type="range"]::-ms-thumb {
                    width: 26px;
                    height: 26px;
                    background: #ffffff;
                    border: 1.8px solid #00001e;
                    border-radius: 15px;
                    cursor: pointer;
                    margin-top: 0px;
                    /*Needed to keep the Edge thumb centred*/
                }

                input[type="range"]:focus::-ms-fill-lower {
                    background: rgba(48, 113, 169, 0.78);
                }

                input[type="range"]:focus::-ms-fill-upper {
                    background: #367ebd;
                }

                @supports (-ms-ime-align:auto) {
                    /* Pre-Chromium Edge only styles, selector taken from hhttps://stackoverflow.com/a/32202953/7077589 */
                    input[type="range"] {
                        margin: 0;
                        /*Edge starts the margin from the thumb, not the track as other browsers do*/
                    }
                }
            `}</style>
        </div>
    )
}
