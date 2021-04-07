import Head from 'next/head'
import hexagons from '../data/hexagons.json'

export default function Home() {

  return (
    <div className="container">
      <Head>
        <title>Honeycomb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="main">
        <div className="honeycomb" style={{
            width: "500px",
            height: "500px"
        }}>
          {hexagons.hexagons.map((hexagon, key) =>
            <div
                className="hexagon"
                key={key}
                style={{
              backgroundImage: `url(${hexagon.url}`
            }} />
          )}
        </div>
      </div>

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
          --hexagon-width: 100px;
          --honeycomb-gap: 1px;
          
          --sec30: 1.1547005383792515; // 1 / cos(30º) = sec(30º)
          --tan30: 0.5773502691896257; // tan(30º)
          
          // r is defined as the inradius: half the diameter of the inscribed circle
          // Further reading: https://en.wikipedia.org/wiki/Hexagon#Parameters
          --r: calc((var(--hexagon-width) * 3 * var(--sec30) / 2) + (4 * var(--honeycomb-gap)) - 2px);
          
          // Allow resizing by dragging bottom-right corner
          resize: both;
          overflow: hidden;
          border: 1px solid #e2e2e2;
        }
        
        .honeycomb {
          // Disable white space between inline block elements
          font-size: 0;
        }
        
        .hexagon {
          width: var(--hexagon-width);
          margin: var(--honeycomb-gap);
          height: calc(var(--hexagon-width) * var(--sec30));
          display: inline-block;
          font-size: initial;
          clip-path: polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%);
          margin-bottom: calc(var(--honeycomb-gap) - (var(--hexagon-width) * var(--tan30) / 2));
          background-size: cover;
          background-position: 50% 50%;
        }
        
        .honeycomb::before {
          content: "";
          width: calc(var(--hexagon-width) / 2 + var(--honeycomb-gap));
          float: left;
          height: 100%;
          shape-outside: repeating-linear-gradient(
            transparent 0 calc(var(--r) - 3px),
            white       0 var(--r)
          );
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
