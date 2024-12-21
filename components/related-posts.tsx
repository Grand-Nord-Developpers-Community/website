import Image from "next/image"
import { Button } from "@/components/ui/button"

const relatedPosts = [
  { id: 1, title: "10 Tips for Small Business Success", image: "/placeholder.svg?height=200&width=300", excerpt: "Learn the top strategies for growing your small business..." },
  { id: 2, title: "The Future of Digital Marketing", image: "/placeholder.svg?height=200&width=300", excerpt: "Discover the latest trends shaping the digital marketing landscape..." },
  { id: 3, title: "Mastering Personal Finance", image: "/placeholder.svg?height=200&width=300", excerpt: "Essential tips for managing your money and achieving financial freedom..." },
]

export default function RelatedPosts() {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Related Posts</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <div key={post.id} className="space-y-3">
            <Image
              src={post.image}
              alt={post.title}
              width={300}
              height={200}
              className="rounded-lg"
            />
            <h4 className="font-semibold">{post.title}</h4>
            <p className="text-sm text-gray-600">{post.excerpt}</p>
            <Button variant="outline" size="sm">Read More</Button>
          </div>
        ))}
      </div>
    </div>
  )
}

