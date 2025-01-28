import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tag } from "@/types";

interface TagsFilterProps {
  tags: Tag[];
  selectedTags: string[];
  onTagSelect: (tagId: string) => void;
}

export function TagsFilter({ tags, selectedTags, onTagSelect }: TagsFilterProps) {
  return (
    <ScrollArea className="w-full">
      <div className="flex flex-wrap gap-2 p-2">
        {tags.map((tag) => (
          <Badge
            key={tag.id}
            variant={selectedTags.includes(tag.id) ? "default" : "outline"}
            className="cursor-pointer"
            style={{
              backgroundColor: selectedTags.includes(tag.id) ? tag.color : 'transparent',
              borderColor: tag.color,
              color: selectedTags.includes(tag.id) ? 'white' : tag.color,
            }}
            onClick={() => onTagSelect(tag.id)}
          >
            {tag.name}
          </Badge>
        ))}
      </div>
    </ScrollArea>
  );
}
