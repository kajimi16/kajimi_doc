// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="algorithm/chapter_0.html"><strong aria-hidden="true">1.</strong> 算法笔记</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="algorithm/chapter_1.html"><strong aria-hidden="true">1.1.</strong> 查缺补漏</a></li><li class="chapter-item expanded "><a href="algorithm/chapter_3.html"><strong aria-hidden="true">1.2.</strong> 算法初步</a></li><li class="chapter-item expanded "><a href="algorithm/chapter_4.html"><strong aria-hidden="true">1.3.</strong> 简单数学</a></li></ol></li><li class="chapter-item expanded "><a href="CSAPP/chapter0.html"><strong aria-hidden="true">2.</strong> CSAPP 学习记录</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="CSAPP/chapter1.html"><strong aria-hidden="true">2.1.</strong> 计算机系统漫游</a></li><li class="chapter-item expanded "><a href="CSAPP/chapter2.html"><strong aria-hidden="true">2.2.</strong> 信息的表示和处理</a></li></ol></li><li class="chapter-item expanded "><a href="Top-Down_Approach/Chapter0.html"><strong aria-hidden="true">3.</strong> 自顶向下学习记录</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="Top-Down_Approach/Chapter1.html"><strong aria-hidden="true">3.1.</strong> 计算机网络和因特网</a></li><li class="chapter-item expanded "><a href="Top-Down_Approach/Chapter2.html"><strong aria-hidden="true">3.2.</strong> 应用层</a></li><li class="chapter-item expanded "><a href="Top-Down_Approach/Chapter3.html"><strong aria-hidden="true">3.3.</strong> 运输层</a></li></ol></li><li class="chapter-item expanded "><a href="rocket/rocket.html"><strong aria-hidden="true">4.</strong> rocketweb 框架初印象</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="rocket/rocket_request.html"><strong aria-hidden="true">4.1.</strong> request</a></li></ol></li><li class="chapter-item expanded "><a href="chemical_speed_run.html"><strong aria-hidden="true">5.</strong> 化学笔记</a></li><li class="chapter-item expanded "><a href="tools/index.html"><strong aria-hidden="true">6.</strong> 你必须会玩的新时代玩具</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="tools/sing.html"><strong aria-hidden="true">6.1.</strong> ai声音</a></li></ol></li><li class="chapter-item expanded "><a href="diary/y25-m01.html"><strong aria-hidden="true">7.</strong> 日志</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
