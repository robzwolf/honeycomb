import Head from 'next/head'
import defaultHexagons from '../data/hexagons.json'
import {Fragment, useState} from "react";
import {ReactSortable} from "react-sortablejs"
import SliderInput from "../components/SliderInput";
import {useResizeDetector} from 'react-resize-detector';
import Dimensions from "../components/Dimensions";
import DownloadButton from "../components/DownloadButton";
import DataCell from "../components/DataCell";

export default function Home() {
    const [hexagons, setHexagons] = useState(defaultHexagons.hexagons);

    const [honeycombGap, setHoneycombGap] = useState(1);
    const setHoneycombGapDefault = () => {
        setHoneycombGap(1)
    };

    const [hexagonWidth, setHexagonWidth] = useState(100);
    const setHexagonWidthDefault = () => {
        setHexagonWidth(100)
    };

    const { width: honeycombWidth, height: honeycombHeight, ref: honeycombRef } = useResizeDetector();

    const [downloading, setDownloading] = useState(false);

    const updateHexagon = (e, hexagon) => {
        const i = hexagons.indexOf(hexagon)
        const newHexagons = [...hexagons]
        newHexagons[i] = {
            ...hexagon,
            [e.target.name]: e.target.value !== "" ? e.target.value : e.target.checked
        }
        setHexagons(newHexagons)
    }

    return (
        <div className="container">
            <Head>
                <title>Honeycomb</title>
                <link rel="icon" href="/favicon.ico"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap"
                      rel="stylesheet"/>
            </Head>

            <div className="app">
                <div className="main" style={{
                    width: "500px",
                    height: "500px"
                }}
                     ref={honeycombRef}
                >
                    <div className="honeycomb">
                        <ReactSortable
                            list={hexagons}
                            setList={setHexagons}
                            animation={200}
                        >
                            {hexagons.map((hexagon, key) =>
                                <div
                                    className="hexagon"
                                    key={key}
                                    draggable={true}
                                    style={{
                                        backgroundImage: `url('${hexagon.url}')`,
                                        display: hexagon.enabled ? 'inline-block' : 'none'
                                    }}/>
                            )}
                        </ReactSortable>
                    </div>
                </div>
                <div className="form">
                    <div className="form-header fc-name">Name</div>
                    <div className="form-header fc-url">Image URL</div>
                    <div className="form-header fc-enabled" />

                    {hexagons.map((hexagon, index) => (
                        <Fragment key={index}>
                            <DataCell
                                column="name"
                                value={hexagon.name}
                                onChange={e => updateHexagon(e, hexagon)}
                            />
                            <DataCell
                                column="url"
                                value={hexagon.url}
                                onChange={e => updateHexagon(e, hexagon)}
                            />
                            <DataCell
                                column="enabled"
                                additionalProps={{
                                    type: "checkbox",
                                    checked: hexagon.enabled,
                                    required: false
                                }}
                                onChange={e => updateHexagon(e, hexagon)}
                            />
                        </Fragment>
                    ))}

                    <button
                        className="form-add-row"
                        onClick={() => {
                            setHexagons([...hexagons, {name: "", url: ""}])
                        }}>
                        <span>Add Hexagon</span>
                    </button>

                    <div className="form-json">
                        <p>Edit or copy the following JSON to save your configuration:</p>
                        <textarea
                            onChange={(e) => {
                                try {
                                    setHexagons(JSON.parse(e.target.value))
                                } catch (ex) {
                                    e.preventDefault()
                                }
                            }}
                            value={JSON.stringify(hexagons.map(hexagon => ({
                                ...hexagon,

                                // Remove these two properties from the rearranging since we don't need them in our JSON
                                chosen: undefined,
                                selected: undefined
                            })), null, 2)}
                        />
                        <p>Drag hexagons around the grid to reorder them.</p>
                    </div>
                </div>

                <div className="settings">
                    <Dimensions width={honeycombWidth} height={honeycombHeight} />

                    <SliderInput
                        value={honeycombGap}
                        min={0}
                        max={10}
                        step={0.5}
                        onChange={(e) => {
                            setHoneycombGap(e.target.value)
                        }}
                        setDefault={setHoneycombGapDefault}
                    />

                    <SliderInput
                        value={hexagonWidth}
                        min={50}
                        max={250}
                        step={1}
                        onChange={(e) => {
                            setHexagonWidth(e.target.value)
                        }}
                        setDefault={setHexagonWidthDefault}
                    />

                    <DownloadButton downloading={downloading} setDownloading={setDownloading} />
                </div>
            </div>

            {/*language=CSS*/}
            <style jsx>{`
                .container {
                    min-height: 100vh;
                    padding: 0 0.5rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    margin-top: 30px;
                }

                .app {
                    display: grid;
                    grid-template-columns: auto auto auto;
                }

                .main {
                    display: flex;

                    --hexagon-width: ${hexagonWidth}px;
                    --honeycomb-gap: ${honeycombGap}px;

                    --cos30: 0.8660254037844387; /* cos(30??) */
                    --tan30: 0.5773502691896257; /* tan(30 ??) */

                    /* r is defined as the inradius: half the diameter of the inscribed circle
                       Further reading: https://en.wikipedia.org/wiki/Hexagon #Parameters   */
                    --r: calc((var(--hexagon-width) * 3 * .5 / var(--cos30)) + (4 * var(--honeycomb-gap)) - 2px);

                    /* Allow resizing by dragging bottom-right corner */
                    resize: both;

                    overflow: hidden;
                    border: 1px solid #e2e2e2;

                    /* We want the width and height to match the dimensions of the inner contents, excluding the box border */
                    box-sizing: content-box;
                }

                .honeycomb {
                    /* Disable white space between inline block elements */
                    font-size: 0;
                }

                .hexagon {
                    width: var(--hexagon-width);
                    margin: var(--honeycomb-gap);
                    height: calc(var(--hexagon-width) / var(--cos30));
                    display: inline-block;
                    font-size: initial;
                    clip-path: polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%);
                    margin-bottom: calc(var(--honeycomb-gap) - (var(--hexagon-width) * var(--tan30) / 2));
                    background-size: cover;
                    background-position: 50% 50%;
                }

                .sortable-ghost {
                    filter: brightness(0) opacity(0.06) drop-shadow(0 0 1px #00b7ff);
                }

                .honeycomb::before {
                    content: "";
                    width: calc(var(--hexagon-width) / 2 + var(--honeycomb-gap));
                    float: left;
                    height: 100%;
                    shape-outside: repeating-linear-gradient(
                            transparent 0 calc(var(--r) - 3px),
                            white 0 var(--r));
                }

                .form {
                    display: grid;
                    grid-template-columns: 1fr 1fr 40px;
                    grid-gap: 8px;
                    margin: auto 20px;
                }
                
                .form-header {
                    font-weight: bold;
                }
                
                .form-add-row {
                    grid-column: 1 / -1;
                    text-align: right;
                    cursor: pointer;
                    height: auto;
                    margin: 0;
                }

                .form-json {
                    grid-column: 1 / -1;
                }

                .form-json textarea {
                    font-size: 12px;
                    border: 1px solid #5d90bc;
                    background: #eef8ff;
                    border-radius: 4px;
                    padding: 4px;
                    font-family: 'Roboto Mono', monospace;
                    width: 100%;
                    height: 100px;
                }

                .form-json p {
                    font-size: 12px;
                    text-align: center;
                    font-weight: bold;
                }
            `}</style>

            {/*language=CSS*/}
            <style jsx global>{`
                html,
                body {
                    padding: 0;
                    margin: 0;
                    font-family: 'Roboto Mono', monospace;
                }

                * {
                    box-sizing: border-box;
                }

                /* Button styles */
                input[type="button"],
                button {
                    height: 29px;
                    font-size: 14px;
                    border: 1px solid #5d90bc;
                    background: #616f78;
                    border-radius: 4px;
                    margin-left: 12px;
                    padding: 4px 10px;
                    font-family: 'Roboto Mono', monospace;
                    color: white;
                    cursor: pointer;
                    transition: all 0.1s;
                }

                input[type="button"]:hover,
                button:hover {
                    background: #3d474d;
                }

                input[type="button"]:active,
                button:active {
                    background: #000;
                    color: #9cbfd0;
                }

                input[type="button"]:disabled,
                button:disabled {
                    cursor: not-allowed;
                    background: #98a1a2;
                    color: lightgray;
                    border: gray;
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
