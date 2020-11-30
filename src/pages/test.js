import React from 'react'
import '../styles/test.scss'

const Test = ()  => {
    return (
        <div className="test">
            <h1>Test</h1>
            <svg id="ex-020-stage" fill="#ddd" viewBox="0 0 400 240" width="800" height="480" > {/* content: 800 x 480 */}
                <rect id="ex-020-rect" x="10" y="10" width="780" height="460"></rect>
                <line id="ex-020-line-1" x2="68" x1="68" y2="167" y1="31"></line>
                <line id="ex-020-line-2" x2="359" x1="354" y2="26" y1="210"></line>
                <path id="ex-020-path" d="M68,31C68,167 359,26 354,210"></path>
                <circle id="ex-020-p0" cx="36" cy="160" r="16" transform="translate(32 -129)" className="cat1"></circle>
                <circle id="ex-020-p1" cx="80" cy="40" r="16" transform="translate(-12 127)" className="cat2"></circle>
                <circle id="ex-020-p2" cx="240" cy="220" r="16" transform="translate(119 -194)" className="cat3"></circle>
                <circle id="ex-020-p3" cx="380" cy="120" r="16" transform="translate(-26 90)" className="cat4"></circle>
            </svg>
        </div>
    )
}


export default Test