import {
  Flower2,
  Leaf,
  Scissors,
  Shrub,
  Shovel,
  Trash2,
  Trees,
  Truck
} from "lucide-react";

const iconClass = "h-6 w-6";

export function getServiceIcon(slug: string) {
  switch (slug) {
    case "bed-cleanup":
      return <Flower2 className={iconClass} />;
    case "mulching":
      return <Leaf className={iconClass} />;
    case "bush-trimming":
      return <Scissors className={iconClass} />;
    case "leaf-cleanup":
      return <Leaf className={iconClass} />;
    case "brush-cleanup":
      return <Trees className={iconClass} />;
    case "edging":
      return <Shovel className={iconClass} />;
    case "planting":
      return <Shrub className={iconClass} />;
    case "off-site-removal":
      return <Truck className={iconClass} />;
    case "spring-cleanup":
      return <Trash2 className={iconClass} />;
    default:
      return <Leaf className={iconClass} />;
  }
}
