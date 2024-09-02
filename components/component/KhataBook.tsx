import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
interface KhataBookInterface {
    id: number;
    username: string;
    amount: number;
    designName: string;
    paymentStatus: string;
    paidDate: string;
}

interface KhataBookTabProps {
    khataBook: KhataBookInterface[];
}
export default function KhataBook({ khataBook }: KhataBookTabProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const filteredKhataBook = khataBook.filter(
        (entry) =>
            entry.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.designName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className="p-6">
            <div className="mb-6">
                <Input
                    placeholder="Search khata book..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Username</TableHead>
                        <TableHead>Design Name</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Payment Status</TableHead>
                        <TableHead>Paid Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredKhataBook.map((entry) => (
                        <TableRow key={entry.id}>
                            <TableCell>{entry.username}</TableCell>
                            <TableCell>{entry.designName}</TableCell>
                            <TableCell>${entry.amount.toFixed(2)}</TableCell>
                            <TableCell>{entry.paymentStatus}</TableCell>
                            <TableCell>{entry.paidDate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
