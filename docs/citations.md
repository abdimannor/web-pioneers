# Citation audit

Every factual claim on the four Swedish pages (and their English twins under `en/`), checked against a source in November 2026. Each source was fetched with curl and the quoted wording below was found in it. Archive links are existing Wayback Machine snapshots found through `https://archive.org/wayback/available` (no new archiving was triggered).

**Summary:** 34 claims audited. 29 confirmed, 0 corrected, 5 unverified (interpretive statements with no single source; left on the page unchanged and listed below).

Verdicts: **confirmed** = the source says what the page says; **corrected** = a primary source contradicts the page and the page was changed; **unverified** = no source checked supports it as a fact (still on the page, visibly listed here).

## index.html (Översikt)

| # | Claim | Source before audit | Source checked (what it says) | Verdict |
|---|---|---|---|---|
| 1 | 1974: Cerf and Kahn describe a model where separate networks can exchange data | none | Cerf & Kahn, IEEE Trans. Commun. 22(5), May 1974, doi:10.1109/TCOM.1974.1092259 (Crossref metadata: "A Protocol for Packet Network Intercommunication", 1974-05) | confirmed |
| 2 | 1 January 1983: ARPANET switches to TCP/IP under RFC 801 | RFC 801 | RFC 801: "complete switch over from the NCP to IP/TCP by 1 January 1983"; ISOC: "transition ... from NCP to TCP/IP as of January 1, 1983" | confirmed |
| 3 | November 1987: RFC 1034 and RFC 1035 describe DNS | RFC 1034, RFC 1035 | Both RFC headers dated "November 1987" | confirmed |
| 4 | 1989: Berners-Lee formulates the global hypertext idea | none | W3C copy of the proposal: "written in March 1989" | confirmed |
| 5 | 6 August 1991: web files put on the net, announced on alt.hypertext | CERN History.html | "August 1991 Files available on the net, posted on alt.hypertext (6, 16, 19th Aug)" | confirmed |
| 6 | 1991 software contained a server, a simple browser and a library | CERN (archived) | CERN short history: "In 1991, Berners-Lee released his WWW software. It included the 'line-mode' browser, Web server software and a library for developers" | confirmed |
| 7 | 30 April 1993: CERN makes the web software free | CERN 30 years | "on 30 April 1993, CERN made an important announcement" (release to the public domain) | confirmed |
| 8 | Mosaic first published browser to show images with text automatically | NCSA | "Mosaic was the first published browser that automatically displayed pictures along with text" | confirmed |
| 9 | December 1993: more than 5,000 Mosaic downloads per month | NCSA | "in December 1993, more than 5,000 copies of the browser were being downloaded a month" | confirmed |
| 10 | 1994: Berners-Lee founds W3C | W3C history | "In October 1994, Sir Tim Berners-Lee founded the World Wide Web Consortium (W3C)" | confirmed |
| 11 | 1998: Google shows links, indexing and ranking can make the web searchable | none | Google, Our story: Page and Brin "founded the company in 1998"; built "a search engine that used links to determine the importance of individual pages" | confirmed |
| 12 | 1998: Brin and Page describe the Google prototype in "The Anatomy...", using hypertext link structure | DOI | Crossref: Computer Networks and ISDN Systems 30(1-7), April 1998; abstract: "a prototype of a large-scale search engine which makes heavy use of the structure present in hypertext" | confirmed |

The seven-step "Vad händer när du öppnar en webbsida?" section already cites an RFC or MDN page on every step (RFC 3986, 1034/1035, 9293, 8446, 9114, 9110, W3C HTML, MDN). These describe how protocols work, not historical events; their sources were left in place and not footnoted again.

## vint.html

| # | Claim | Source before audit | Source checked | Verdict |
|---|---|---|---|---|
| 13 | Cerf helped shape TCP/IP | IEEE paper, IHOF in reading list | IHOF: "co-designer of the TCP/IP protocols"; 1974 paper | confirmed |
| 14 | Born 1943 in Connecticut | none | Computer History Museum: "born in New Haven, Connecticut, in 1943" | confirmed |
| 15 | 1970s: Cerf and Kahn developed the ideas behind TCP/IP | IEEE paper in reading list | ISOC: in spring 1973 Kahn "asked Vint Cerf ... to work with him on the detailed design"; 1974 paper | confirmed |
| 16 | 1983: ARPANET moves to TCP/IP | RFC 801 in reading list | RFC 801; ISOC (see #2) | confirmed |
| 17 | 1990s: internet becomes public, more networks, companies and users connect | none | ISOC: NSF privatization "culminated in April, 1995, with the defunding of the NSFNET Backbone"; commercialization described | confirmed (date and development); causal framing is the author's |
| 18 | 2000s: Cerf continued working on the internet's development | none | IHOF: "Since 2005, he has served as vice president and chief Internet evangelist for Google ... continued standardization and spread of the Internet" | confirmed |
| 19 | "Princip: Nätverk av nätverk" card | none | interpretive summary | unverified (interpretation) |

## tim.html

| # | Claim | Source before audit | Source checked | Verdict |
|---|---|---|---|---|
| 20 | Born 8 June 1955 in London | none | W3C longer biography: "Born London, England, 8 June 1955" | confirmed |
| 21 | 1976: physics degree, The Queen's College, Oxford | none | W3C longer biography: "BA Hons (I) Physics, 1973-1976"; "graduated from the Queen's College at Oxford University, England, 1976" | confirmed |
| 22 | 1980: built Enquire at CERN | none | Proposal: "In 1980, I wrote a program ... Called Enquire"; W3C bio: consultant at CERN Jun-Dec 1980 | confirmed |
| 23 | 1989: WWW proposal | W3C proposal in reading list | "written in March 1989" | confirmed |
| 24 | First website created at CERN in 1990 | first website link in reading list | W3C bio: "He wrote the first web client and server in 1990"; CERN: info.cern.ch "the world's first website and Web server" | confirmed |
| 25 | The following year the web became available to more users | none | CERN short history: March 1991 to CERN colleagues, August 1991 announced on newsgroups | confirmed |
| 26 | 1994: founded W3C | W3C history in reading list | W3C history; W3C bio "founded in 1994" | confirmed |

## google.html

| # | Claim | Source before audit | Source checked | Verdict |
|---|---|---|---|---|
| 27 | 1998: founded by Larry Page and Sergey Brin after work on using links to rank pages | Google our story in reading list | Google, Our story (see #11) | confirmed |
| 28 | PageRank valued how other pages link to a page | paper in reading list | The Anatomy paper, section on PageRank (Stanford PDF copy) | confirmed |
| 29 | The search engine built an index making large amounts of web material quickly searchable | paper in reading list | Abstract: "designed to crawl and index the Web efficiently" | confirmed |
| 30 | "Relevans: Resultat i ordning" card | none | interpretive summary | unverified (interpretation) |
| 31 | "Vardag: Sök som vana" card | none | no source checked on search as everyday habit | unverified |
| 32 | "Fråga: Makt över synlighet" card | none | interpretive argument | unverified (interpretation) |

## Other statements

| # | Claim | Page | Verdict |
|---|---|---|---|
| 33 | Lead: Google made search the everyday starting point | google.html | unverified (interpretation) |
| 34 | Lead: Berners-Lee combined hypertext, addresses, browser, server and open standards | tim.html | confirmed by W3C bio ("wrote the first web client and server ... specifications of URIs, HTTP and HTML"); not footnoted separately because the fact cards below cite the same source |

## Corrections

None. No primary source contradicted a date or attribution on the pages.

## Notes

- The Cerf and Kahn paper is cited by DOI (persistent identifier); the Wayback API had no snapshot for the DOI URL. The Anatomy paper is cited by DOI plus its archived Stanford copy.
- Wikipedia "Fördjupa dig" links remain as reading pointers; nothing is sourced to them.
- The existing "Vidare läsning" lists are kept unchanged; the new "Källor" / "Sources" list at the end of each page carries the numbered references.
