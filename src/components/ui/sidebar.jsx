import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Settings, Bell, Grid, ChevronDown, ChevronUp } from "lucide-react";

// ─── Nav items config ─────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: "Home",          icon: <Home className="h-4 w-4" />,     href: "#" },
  { label: "Notifications", icon: <Bell className="h-4 w-4" />,     href: "#" },
  { label: "Categories",    icon: <Grid className="h-4 w-4" />,     href: "#" },
  { label: "Settings",      icon: <Settings className="h-4 w-4" />, href: "#" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const AnimatedMenuToggle = ({ toggle, isOpen }) => (
  <button
    onClick={toggle}
    aria-label={isOpen ? "Close menu" : "Open menu"}
    className="focus:outline-none"
    style={{ outlineColor: "var(--accent)" }}
  >
    <motion.svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      transition={{ duration: 0.3 }}
      style={{ color: "var(--text-h)" }}
    >
      <motion.path
        fill="transparent"
        strokeWidth="2.5"
        stroke="currentColor"
        strokeLinecap="round"
        variants={{
          closed: { d: "M 2 2.5 L 22 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
      />
      <motion.path
        fill="transparent"
        strokeWidth="2.5"
        stroke="currentColor"
        strokeLinecap="round"
        variants={{
          closed: { d: "M 2 12 L 22 12", opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.path
        fill="transparent"
        strokeWidth="2.5"
        stroke="currentColor"
        strokeLinecap="round"
        variants={{
          closed: { d: "M 2 21.5 L 22 21.5" },
          open: { d: "M 3 2.5 L 17 16.5" },
        }}
      />
    </motion.svg>
  </button>
);

const CollapsibleSection = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-2">
      <button
        className="w-full flex items-center justify-between py-2 px-3 rounded-md text-sm font-medium transition-colors"
        style={{ color: "var(--text)" }}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{title}</span>
        {open
          ? <ChevronUp className="h-4 w-4" />
          : <ChevronDown className="h-4 w-4" />
        }
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pl-3 pr-1 pb-1">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Shared nav list ──────────────────────────────────────────────────────────

const NavList = () => (
  <nav className="flex-1 p-4 overflow-y-auto">
    <ul className="space-y-1">
      {NAV_ITEMS.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            className="flex items-center gap-3 w-full py-2 px-3 rounded-md text-sm font-medium transition-colors"
            style={{ color: "var(--text-h)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--code-bg)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            {item.icon}
            {item.label}
          </a>
        </li>
      ))}
    </ul>

    <div
      className="mt-4 pt-4"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <CollapsibleSection title="Extra Options">
        <ul className="space-y-1">
          {["Subscriptions", "Appearance"].map((label) => (
            <li key={label}>
              <button
                className="w-full text-left text-sm py-1.5 px-3 rounded-md transition-colors"
                style={{ color: "var(--text)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "var(--code-bg)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </CollapsibleSection>

      <CollapsibleSection title="More Info">
        <p className="text-sm px-3 py-1" style={{ color: "var(--text)" }}>
          Additional details and settings can be found here.
        </p>
      </CollapsibleSection>
    </div>
  </nav>
);

// ─── Profile header ───────────────────────────────────────────────────────────

const ProfileHeader = () => (
  <div className="p-4" style={{ borderBottom: "1px solid var(--border)" }}>
    <div className="flex items-center gap-3">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: "var(--code-bg)" }}
      >
        <User className="h-5 w-5" style={{ color: "var(--text)" }} />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold truncate" style={{ color: "var(--text-h)" }}>
          GreenTrust User
        </p>
        <p className="text-xs truncate" style={{ color: "var(--text)" }}>
          user@greentrust.app
        </p>
      </div>
    </div>
  </div>
);

// ─── Footer action ────────────────────────────────────────────────────────────

const SidebarFooter = () => (
  <div className="p-4" style={{ borderTop: "1px solid var(--border)" }}>
    <button
      className="w-full text-sm font-medium py-2 px-4 rounded-md transition-all"
      style={{
        background: "var(--social-bg)",
        border: "1px solid var(--border)",
        color: "var(--text-h)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "var(--shadow)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
    >
      View profile
    </button>
  </div>
);

// ─── Main Sidebar export ──────────────────────────────────────────────────────

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const sidebarStyle = {
    background: "var(--bg)",
    borderRight: "1px solid var(--border)",
  };

  return (
    <>
      {/* Mobile overlay sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 z-50 flex flex-col w-72"
            style={sidebarStyle}
            aria-label="Mobile navigation"
          >
            <ProfileHeader />
            <NavList />
            <SidebarFooter />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex flex-col fixed top-0 left-0 h-full w-64"
        style={sidebarStyle}
        aria-label="Main navigation"
      >
        <ProfileHeader />
        <NavList />
        <SidebarFooter />
      </aside>

      {/* Mobile topbar */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 h-14"
        style={{
          background: "var(--bg)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <span className="text-sm font-semibold" style={{ color: "var(--text-h)" }}>
          GreenTrust
        </span>
        <AnimatedMenuToggle toggle={toggleSidebar} isOpen={isOpen} />
      </div>
    </>
  );
};

export { Sidebar };
