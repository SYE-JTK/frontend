import React from 'react'

class AboutPage extends React.Component {

  render() {
    return (
      <div
        className='row mb-4 mt-3 px-5 py-2'
        style ={{marginLeft: "15%", marginRight: "15%", backgroundColor: '#F1F1F1'}}
      >
        
        <h2 style ={{marginLeft: 'auto', marginRight: 'auto'}}>Overview</h2>
        <p style ={{textIndent: "3em"}}>
          This web application was built by Tim Jones, Kira Murphy, and Jonas Peek for our Computer Science Senior Year Experience at St. Lawrence University in Spring 2020. It is a culmination of our four years of education in the techniques, data structures, and algorithms of computer science. We have learned and implemented proper coding practices, including commenting our code and using version control. Additionally, we have done our best to implement industry standards for code organization and design principles. The development of this application has required hours of self-study and constant communication; this has led to the application that is currently running <a href='https://jtk-sye.firebaseapp.com/'>here</a>.
        </p>
        <p style ={{textIndent: "3em"}}>
          The overarching goal of the application is to increase student connectedness within college communities across the country. Currently, however, it functions as a general roommate finder. Users begin by creating an account which includes basic information and personal living habits. Once an account is created, the user can navigate to the Home page where they can view other user&rsquo;s profiles and add these users as friends. After a friend request has been accepted, the user can view this friend on the Friends page. From here, the user can choose to message their friends in the messaging component of the application.
        </p>
        <p style ={{textIndent: "3em"}}>   
          The next step in our project is to create an algorithm that will recommend roommates for users based on the similarities of their profiles. Furthermore, we would like to increase the capability of the application by including components that allow users to connect with other students who are taking similar courses or are involved in the same clubs, sports, and activities. The information provided about coursework and hobbies will also be incorporated into the algorithm so we can find the user&rsquo;s the best match possible. Once we implement these additional components, it would be necessary to create platforms for specific institutions.
        </p>
      
        <h2 style ={{marginLeft: 'auto', marginRight: 'auto'}}>Stack Reasoning and Code Structure</h2>
        <p style ={{textIndent: "3em"}}>
          As we have stated, the goal of this project was to create a web application that connected students, the clear first step was to learn basic JavaScript and decide which libraries we wanted to invest time learning about. Given the little experience we had in full stack web development, we had a lot of work to do to even understand which pieces of the app we needed to employ libraries for. We decided that if we used basic JavaScript, and HTML this application would take far too long to build. Considering all of this and the research that we did into the different libraries that are currently being used industry wide, we decided to use <a href='https://reactjs.org/'>ReactJs</a> to develop our user interface. ReactJs was a prudent decision based on its simplistic yet powerful tools to build engaging components with HTML embedded JavaScript.
        </p>
        <p style ={{textIndent: "3em"}}>
          After having success with ReactJs streamlining our development process, we looked for a library to help us manage application state in order push this closer to a commercial level application with sophisticated interactions and user sessions that were intuitive and fun. <a href='https://redux.js.org/'>Redux</a> provided us that ability. With state being managed and kept across page refreshes and even window closes, the user does not have to continue entering the same information over and over again. Redux allowed the user to login and start interacting seamlessly with the environment that we created.
        </p>
        <p style ={{textIndent: "3em"}}>
          Although this is a full stack application, we wanted to direct our focus on the frontend. Therefore, we decided to utilize <a href='https://firebase.google.com/docs'>Firebase</a> Authentication, Database, Storage, and Hosting for much of our backend development. This allowed us to spend our time creating components that improve our user experience.
        </p>
        <p style ={{textIndent: "3em"}}>
          By using Firebase Authentication, users can sign in using their Google credentials. This removed the need for us to develop our own authentication software, which likely would have led to a multitude of security issues. Moving forward, we would like to add the ability to sign in using Facebook or a personal email/password combination.
        </p>
        <p style ={{textIndent: "3em"}}>
          When first developing the application, we were not using Firebase Database or Storage. We planned to use PostgreSQL to develop a relational database. However, with the development of our messaging platform and user profiles, we quickly realized how much data we needed to store. Additionally, much of the data we were storing did not require complicated relations or querying. Since our application was already set up as a Firebase project, we decided to use a Firebase database. We briefly considered using MongoDB but given our time constraints and lack of complex queries, we decided against it. Additionally, using Firebase Storage allowed us to quickly store and access user profile images.
        </p>
        <p style ={{textIndent: "3em"}}>
          Finally, we decided to use Firebase hosting because it allowed our application to be used by people who do not attend St. Lawrence University. We were initially running it on a virtual machine and therefore only individuals connected to the St. Lawrence network could connect. Since our overarching goal is for colleges across the country to use the application, we needed a service that would allow use to deploy on a global scale.
        </p>

        
        <h2 style ={{marginLeft: 'auto', marginRight: 'auto'}}>Acknowledgements</h2>
        <p style ={{textIndent: "3em"}}>We would like to extend our sincerest appreciation to our advisor, Dr. Ed Harcourt, for his guidance and support throughout the development of this application. Dr. Harcourt has been a professor at St. Lawrence University since 2003 and has been an integral part of the growth our Computer Science Department has seen over the last 17 years. He has inspired many students, the three of us included, to pursue excellence in computer science and beyond.</p>

        <p style ={{textIndent: "3em"}}>We would also like to thank the entire Mathematics, Computer Science, and Statistics Department at St. Lawrence University for giving us the opportunity to pursue an honors project. They have spent countless hours providing us the education that has led to our success over the past four years; from the basics of python to complicated graph theoretic algorithms, they have given us the tools we needed to succeed.</p>

        <p style ={{textIndent: "3em"}}>Additionally, we would like to acknowledge our incredible friends who have tested our application at various stages of development and supported our late night coding sessions. Specifically, we would like to thank our very first users: Jack Pattison, Mason Stehle, Abby Smalley, and Garrett Stosiek.</p>

        <p style ={{textIndent: "3em"}}>Last but not least, we would like to thank our families who have been a constant source of love and inspiration. They have given us the opportunity to attend St. Lawrence University and have helped us become the successful students and developers that we are today.</p>
      </div>
    );
  }
}

export default AboutPage;
