const searchParams = new URLSearchParams(window.location.search);
const searchValue = searchParams.get('search');
let activeElement = null

let jobjson = {
    "jobID": {
        "S": "rmZM0i5Ibmij8FaQtCO5"
    },
    "title": {
        "S": "Content Marketing Associate"
    },
    "about": {
        "S": `<div class=\"show-more-less-html__markup show-more-less-html__markup--clamp-after-5 relative overflow-hidden\">\n<strong>Join the team at Rapptr Labs!<br/><br/></strong>At Rapptr, we’re dedicated to helping our clients to build and scale successful digital products. Our success as a digital product agency is defined by the depth of these partnerships, the quality of our products, and the level of expertise and product strategy we can bring to businesses of any size – from funded start-ups to established brands.<br/><br/><strong>A culture of care, quality, and determination<br/><br/></strong>It is our mission to provide our team members with a safe working environment and a culture that centers employee wellbeing, collaboration, initiative, hands-on learning, and determination. Who we are is reflected in how we engage with our clients, how we solve day-to-day problems, and how we treat one another on- and offline.<br/><br/><strong>About The Role<br/><br/></strong>Rapptr Labs is looking for a highly motivated Part Time Content Marketing Associate to join our growing app design and development agency.<br/><br/>In this role, you will help support business growth through a combination of inbound marketing tactics, content creation, and social media management. This role reports to and works closely with Rapptr's Chief Executive Officer (CEO), who is overseeing new marketing initiatives at Rapptr. You will work alongside Rapptr's greater Design, Engineering, and Product teams to leverage their insights and inform your understanding of Rapptr and its offerings.<br/><br/>Your success in this role relies on your ability to work independently and as part of a team, a strong attention to detail, and a goal-oriented mindset. You will need to meet project targets within timelines, adapt to changing priorities, and handle multiple tasks simultaneously. Candidates with strong critical thinking and problem-solving abilities, and a willingness to learn and grow within the company are highly valued. We prefer recent college graduates or those with 0-2 years of experience in marketing, communications or a related field.<br/><br/>This is a part-time (up to 20 hrs. per week) in-person role based out of our office at 1 Penn Plaza in Midtown Manhattan.<br/><br/>Compensation Range: $15 to $20 an hour<br/><br/><strong>What You’ll Do<br/><br/></strong><ul><li>Envision and drive digital content in line with business values and objectives</li><li>Establish, manage, and evolve Rapptr’s pipeline of thought leadership content</li><li>Partner with Rapptr’s internal engineering &amp; design teams to create thought-leadership content</li><li>Oversee multi-channel distribution of blog, marketing, and social content</li><li>Assist in creating white-papers, case studies, blog posts, and newsletters</li><li>Optimize Rapptr's website through suggested content and SEO best practices</li><li>Implement SEO strategy to increase traffic for digital products</li><li>Manage paid ad spend for internal initiatives<br/><br/></li></ul><strong>What You Bring<br/><br/></strong><ul><li>BA/BS in Business, Communications, or Marketing or equivalent experience required</li><li>0-2 years of experience in marketing, communications, or a related field</li><li>Excellent interpersonal, written, and oral communication skills</li><li>Highly organized and able to comfortably work across several tasks simultaneously<br/><br/></li></ul><strong>Bonus Qualifications<br/><br/></strong><ul><li>Experience using marketing tools such as Hubspot, SEM Rush, Meta Business Suite, etc.</li><li>Experience working in a startup and/or agency setting</li><li>Domain knowledge in custom software design and development<br/><br/></li></ul><strong>A Glimpse at What We Offer<br/><br/></strong><ul><li>Opportunities to work on diverse and innovative projects.</li><li>A collaborative, inclusive, and friendly work culture.</li><li>Engagement in a company renowned for its excellence and innovative spirit.</li><li>A chance to be part of a team that values challenges and is committed to continuous improvement.<br/><br/></li></ul><strong>Equal Opportunity Employer<br/><br/></strong>Rapptr Labs is proud to be an Equal Opportunity Employer. We stand behind our culture, which values and celebrates diversity, inclusivity, and does not discriminate on the basis of race, religion, color, national origin, gender, sexual orientation, age, marital status, veteran status, parental status, disability status, or any other protected group. We believe that we are all better when we encourage, support, and respect the diversity in backgrounds, experiences, and skills that we each bring to the Rapptr team.<br/><br/>Powered by JazzHR<br/><br/>kEQ1F4GbAO\n        </div>`
    },
    "benefits": {
        "S": "Be an early applicant"
    },
    "detailsLink": {
        "S": "https://www.linkedin.com/jobs/view/content-marketing-associate-at-rapptr-labs-3837153298?refId=oYW1ZKkMQ5iocyHVajqORQ%3D%3D&trackingId=ett%2FxXOFXy15nQceFdeuvw%3D%3D&position=15&pageNum=0&trk=public_jobs_jserp-result_search-card"
    },
    "imgSrc": {
        "NULL": true
    },
    "list_date": {
        "S": "1 hour ago"
    },
    "location": {
        "S": "New York, NY"
    },
    "subtitle": {
        "S": "Rapptr Labs"
    }
}
class JobEntry
{
    constructor(json)
    {
        this.htmlElement = createJobResultHTML(json)
        this.link = json['detailsLink']
        this.about = json['about']
    }

    getAbout()
    {
        return this.about
    }

    getLink()
    {
        return this.link
    }

    getHtmlElement()
    {
        return this.htmlElement
    }
}

function setActiveResult(element)
{
    if (activeElement)
    {
        activeElement.style = ""
    }

    element.style = "background-color: #59cf59; color: black;"
    activeElement = element

    let activeWindow = document.getElementById('info-window-scrollbar')
    activeWindow.innerHTML = ""
    activeWindow.innerHTML = element.getAttribute('about')

    let visitButton = document.getElementById('visit-button')
    visitButton.href = element.getAttribute('detailsLink')
}

function createJobResultHTML(json)
{
    let searchResult = document.createElement('div')
    searchResult.className = "search-result"

    let jobInfo = document.createElement('div')
    jobInfo.className = "job-info"

    let jobTitle = document.createElement('div')
    jobTitle.className = "job-title"

    let jobCompany = document.createElement('div')
    jobCompany.className = "job-company"

    let jobLocation = document.createElement('div')
    jobLocation.className = "job-location"

    jobInfo.appendChild(jobTitle)
    jobInfo.appendChild(jobCompany)
    jobInfo.appendChild(jobLocation)

    searchResult.appendChild(jobInfo)

    jobTitle.innerHTML = json['title']
    jobCompany.innerHTML = json['subtitle']
    jobLocation.innerHTML = json['location']

    searchResult.setAttribute('detailsLink', json['detailsLink'])
    searchResult.setAttribute('about', json['about'])

    setActiveResult(searchResult)
    searchResult.addEventListener('click', function ()
    {
        setActiveResult(searchResult)
    })

    return searchResult
}

let visitButton = document.getElementById('visit-button')
visitButton.addEventListener('click', function ()
{
    window.open(visitButton.href, '_blank');
})

let url = 'https://izvyt4q72zpko3vke3urat2twm0viktb.lambda-url.us-west-1.on.aws/?q=';
let resp = await fetch(url + searchValue)
let queriedJobJson = await resp.json()
let resultObjects = queriedJobJson['hits']['hits']

if (resultObjects.length > 0)
{
    for (let index in resultObjects)
    {
        console.log(index)
        let result = resultObjects[index]
        let finalJSON = result['_source']
        let j = createJobResultHTML(finalJSON)
        document.getElementById('job-search-results').appendChild(j)
    }
}
else
{
    visitButton.style.display = "none"
    let placeholder = document.createElement('div')
    placeholder.className = "no-results-pleaceholder"
    placeholder.innerHTML = "Sorry, no results found."
    document.getElementById('job-search-results').appendChild(placeholder)
}