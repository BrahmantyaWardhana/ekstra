export default function Footer() {
  return(
    <footer>
      <div className="flex">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 border-slate-400/10 border-t px-4 py-6 sm:px-6 lg:px-8">
          {/* nav links */}
          <nav className="text-sm">
            <div className="-my-1 flex justify-center gap-x-6">
              <a>Terms of Service</a>
              <a>Privacy Policy</a>
              <a>Support</a>
            </div>
          </nav>
          <p className="text-sm">© 2025 Ekstra. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}