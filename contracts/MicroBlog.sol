// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract MicroBlog {

    event NewPost(address indexed author, string content, uint256 timestamp);

    struct Post {
        address author;
        string  content;
        uint256 timestamp;
    }

    Post[] posts;

    function store(string memory _content) public {
        posts.push(Post(msg.sender, _content, block.timestamp));
        emit NewPost(msg.sender, _content, block.timestamp);
    }

    function getPosts() public view returns (Post[] memory) {
        return posts;
    }

    function getPostsByAuthor(address _author) public view returns (Post[] memory) {
        Post[] memory results = new Post[](posts.length);
        for (uint i = 0; i < posts.length; i++) {
            if (posts[i].author == _author) {
                results[i] = posts[i];
            }
        }
        return results;
    }
}