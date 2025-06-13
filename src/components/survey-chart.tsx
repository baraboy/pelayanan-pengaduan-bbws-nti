import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function SurveyChart({ data }: { data: any }) {

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" interval={0} height={60} fontSize={12} tick={CustomizeAxixTick} />
                <YAxis fontSize={12} />
                <Tooltip />
                {/* <Legend /> */}
                <Bar dataKey="nilai" fill="#8884d8" barSize={60} activeBar={<Rectangle fill="#8884d8" stroke="blue" />} />
                {/* <Bar dataKey="kemudahan_prosedur" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} /> */}
            </BarChart>
        </ResponsiveContainer>
    );
}

function CustomizeAxixTick({ x, y, stroke, payload }: { x: number, y: number, stroke: any, payload: any }) {

    return (
        <g transform={`translate(${x},${y + 10})`} stroke={stroke}>
            <text x={0} y={0} dy={16} textAnchor="middle" fill="#666" transform="rotate(-15)" fontSize={12}>
                {payload.value}
            </text>
        </g>
    );
}