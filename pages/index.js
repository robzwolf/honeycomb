import Head from 'next/head'
import { create, all } from 'mathjs'

const math = create(all, {})

export default function Home() {
  const hexagons = [
    {
      url: "https://www.robbie.dev/assets/img/education/aws-cert-logos/No%20Border/AWS-SysOpAdmin-Associate-2020.png"
    },{
      url: "https://www.robbie.dev/assets/img/education/aws-cert-logos/No%20Border/AWS-SysOpAdmin-Associate-2020.png"
    },{
      url: "https://www.robbie.dev/assets/img/education/aws-cert-logos/No%20Border/AWS-SysOpAdmin-Associate-2020.png"
    },
  ]

  return (
    <div className="container">
      <Head>
        <title>Honeycomb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="main">
        <div className="honeycomb">
          {hexagons.map((hexagon, key) =>
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
          --r: calc((var(--hexagon-width) * 3 * 1.1547 / 2) + (4 * var(--honeycomb-gap)) - 2px);
        }
        
        .honeycomb {
          // Disable white space between inline block elements
          font-size: 0;
        }
        
        .hexagon {
          width: var(--hexagon-width);
          margin: var(--honeycomb-gap);
          height: calc(var(--hexagon-width) * ${math.sec(math.to(math.unit('30 deg'), 'rad'))});
          display: inline-block;
          font-size: initial;
          clip-path: polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%);
          margin-bottom: calc(var(--honeycomb-gap) - (var(--hexagon-width) * ${math.tan(math.to(math.unit('30 deg'), 'rad'))} / 2));
          background-size: contain;
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
