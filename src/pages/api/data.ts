import { NextApiRequest, NextApiResponse } from "next";

const mockData = {
    timestamp: "2024-02-02T22:25:03.132985",
    idx: "001",
    query: "Simulate a cyber attack",
    agents: [
        {
            name: "Agent 11",
            tools: [
                {
                    name: "Tool A",
                    input: "Input A",
                    output: "Output A",
                    idx: "A1",
                },
                {
                    name: "Tool B",
                    input: "Input B",
                    output: "Output B",
                    idx: "B1",
                },
            ],
            images: [],
            output: "Agent 1 Output",
            idx: "Agent1",
        },
    ],
    response: "Attack simulation complete.",
    total_tokens: 1909,
    is_active: true,
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(mockData);
}
