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

interface Design {
    id: number;
    name: string;
    stitches: number;
    hours: number;
}

interface DesignsTabProps {
    designs: Design[];
}
export default function DesignsTab({ designs }: DesignsTabProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const filteredDesigns = designs.filter((design: Design) =>
        design.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    function handleDesignClick(design: any): void {
        throw new Error("Function not implemented.");
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <Input
                    placeholder="Search designs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Design Name</TableHead>
                        <TableHead>Stitches</TableHead>
                        <TableHead>Hours</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredDesigns.map((design: Design) => (
                        <TableRow
                            key={design.id}
                            onClick={() => handleDesignClick(design)}
                            className="cursor-pointer hover:bg-muted"
                        >
                            <TableCell>{design.name}</TableCell>
                            <TableCell>{design.stitches}</TableCell>
                            <TableCell>{design.hours}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
