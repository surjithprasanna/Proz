import Link from "next/link"

export function Footer() {
    return (
        <footer className="bg-background border-t border-border py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold">ProZ</h3>
                        <p className="text-muted-foreground text-sm">
                            Building the future of software for students, startups, and enterprises.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Services</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/services" className="hover:text-foreground transition-colors">Web Development</Link></li>
                            <li><Link href="/services" className="hover:text-foreground transition-colors">Mobile Apps</Link></li>
                            <li><Link href="/services" className="hover:text-foreground transition-colors">UI/UX Design</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
                            <li><Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
                            <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
                            <li><Link href="/refund" className="hover:text-foreground transition-colors">Refund Policy</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} ProZ. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
