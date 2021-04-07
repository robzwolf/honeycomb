import Head from 'next/head'
import defaultHexagons from '../data/hexagons.json'
import {useState} from "react";
import {ReactSortable} from "react-sortablejs"
import SliderInput from "../components/SliderInput";

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

    return (
        <div className="container">
            <Head>
                <title>Honeycomb</title>
                <link rel="icon" href="/favicon.ico"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap"
                      rel="stylesheet"/>
            </Head>

            <div className="main" style={{
                width: "500px",
                height: "500px"
            }}>
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
                                draggable={false}
                                style={{
                                    backgroundImage: `url(${hexagon.url}`
                                }}/>
                        )}
                    </ReactSortable>
                </div>
            </div>

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

            {/*language=CSS*/}
            <style jsx>{`
                .container {
                    min-height: 100vh;
                    padding: 0 0.5rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                .main {
                    display: flex;

                    --hexagon-width: ${hexagonWidth}px;
                    --honeycomb-gap: ${honeycombGap}px;
                       
                    --cos30: 0.8660254037844387; /* cos(30º) */
                    --tan30: 0.5773502691896257; /* tan(30 º) */
                    
                    /* r is defined as the inradius: half the diameter of the inscribed circle
                       Further reading: https://en.wikipedia.org/wiki/Hexagon #Parameters   */
                    --r: calc((var(--hexagon-width) * 3 * .5 / var(--cos30)) + (4 * var(--honeycomb-gap)) - 2px);
    
                    /* Allow resizing by dragging bottom-right corner */
                    resize: both;
                    
                    overflow: hidden;
                    border: 1px solid #e2e2e2;
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
                        white       0 var(--r));
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
            `}</style>
        </div>
    )
}
