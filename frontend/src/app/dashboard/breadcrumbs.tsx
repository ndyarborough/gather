import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Breadcrumbs() {
  const path = usePathname(); // Get current URL
  const segments = path.split("/").filter(Boolean); // Split into parts

  return (
    <nav className="text-gray-600">
      {segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        return (
          <span key={href}>
            <Link href={href} className="text-blue-500 hover:underline">
              {segment}
            </Link>
            {index < segments.length - 1 && " > "}
          </span>
        );
      })}
    </nav>
  );
}
