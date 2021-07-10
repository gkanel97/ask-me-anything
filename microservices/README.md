## Microservices implementation

<p>The application architecture was refactored to comply with the microservices standards. To be more concise, the database and the functions have been split in smaller but autonomous components. The microservices need to communicate with each other, so as to synchronize their databases; this necessity is enabled by a choreographer which manages communication channels. </p>
<p> The following microservices have been created:</p>

- **Choreographer** <br>
The choreographer is responsible for the communication between the microservices. Upon startup, it creates three channels: ```users```, ```questions``` and ```keywords```. The channels enable pub-sub messaging through the redis key-value storage; more specifically, the sending microservice publishes a message to the channel, and all microservices that have subscribed to this channel receive it. ```subscribeAsync``` and ```publishAsync``` functions implement the above described functionality.
- **Answer** <br>
This microservice implements the answer entity functions. It stores a copy of the users and questions databases and subscribes to these two channels, so as to receive updates.
- **Auth** <br>
The authorization microservice implements the JWT strategy. It generates and manages the JWT access and refresh tokens, and stores the refresh tokens and users. It subscribes to the users channel.
- **Keyword** <br>
The keyword microservice subscribes to the users and questions channels, and publishes to the keyword channel. It is responsible for the keyword generation and question tagging.
- **Keyword-search** <br>
This microservice implements the search functions for keywords. It is separate from the keyword microservices, because the designers think that the search function will have high load (it is called by the frontend while typing). It subscribes to the keywords channel.
- **Question** <br>
The question microservice manages question entities. It subscribes to the users channel and publishes to the questions chaneel.
- **User** <br>
This microservice is responsible for creating and managing users. It does not need to subscribe to any channels; it publishes to the user channel a message, when a new user is created.
