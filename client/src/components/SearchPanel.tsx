import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface SearchPanelProps {
  onSearch?: (query: string) => void;
}

export default function SearchPanel({ onSearch }: SearchPanelProps) {
  const [query, setQuery] = useState("");

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch?.(value);
    console.log("Search query:", value);
  };

  const quickFilters = ["People", "Jobs", "Candidates", "Interviews"];

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search people, jobs, candidates..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10"
          data-testid="input-global-search"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {quickFilters.map((filter) => (
          <Badge
            key={filter}
            variant="outline"
            className="cursor-pointer hover-elevate"
            onClick={() => handleSearch(filter)}
            data-testid={`filter-${filter.toLowerCase()}`}
          >
            {filter}
          </Badge>
        ))}
      </div>
    </div>
  );
}
