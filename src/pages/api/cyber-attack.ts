

import { CyberAttackData } from '@/types/cyber-attack';
import { NextApiRequest, NextApiResponse } from 'next';
const mockData: CyberAttackData = {
    timestamp: "2024-02-02T22:25:03.132985",
    idx: "001",
    query: "Simulate a cyber attack",
    agents: [
        {
            name: "Reconnaissance Agent",
            tools: [
                {
                    name: "Network Scanner",
                    input: "Target IP range",
                    output: "Open ports and services",
                    idx: "T001"
                },
                {
                    name: "Vulnerability Scanner",
                    input: "Target system information",
                    output: "Potential vulnerabilities",
                    idx: "T002"
                }
            ],
            images: [],
            output: "Identified potential entry points",
            idx: "A001"
        },
        {
            name: "Exploitation Agent",
            tools: [
                {
                    name: "Exploit Kit",
                    input: "Vulnerability information",
                    output: "Successful exploit",
                    idx: "T003"
                }
            ],
            images: [],
            output: "Gained initial access to the system",
            idx: "A002"
        },
        {
            name: "Persistence Agent",
            tools: [
                {
                    name: "Backdoor Installer",
                    input: "System access",
                    output: "Installed backdoor",
                    idx: "T004"
                }
            ],
            images: [],
            output: "Established persistent access",
            idx: "A003"
        }
    ],
    response: "Cyber attack simulation completed successfully",
    total_tokens: 1909,
    is_active: true
}
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(mockData);
}
