// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "hardhat/console.sol";

contract MicroBlog {

    event NewPost(address indexed from, uint256 timestamp, string content);

    struct Post {
        address author;
        string  content;
        bool    isDeleted;
        uint256 timestamp;
    }

    Post[] posts;

    function store(string memory _content) public {
        posts.push(Post(msg.sender, _content, false, block.timestamp));
        console.log("%s has posted!", msg.sender);
        emit NewPost(msg.sender, block.timestamp, _content);
    }

    function destroy(uint _id) public {
        require(
            posts[_id].author == msg.sender,
            "Only the author can delete posts."
        );
        posts[_id].isDeleted = true;
        console.log("%s has deleted!", msg.sender);
    }

    function getPosts() public view returns (Post[] memory) {
        Post[] memory results;
        for (uint i = 0; i < posts.length; i++) {
            if (!posts[i].isDeleted) {
                results[i] = posts[i];
            }
        }
        return results;
    }

    function getPostsByAuthor(address _author) public view returns (Post[] memory) {
        Post[] memory results;
        for (uint i = 0; i < posts.length; i++) {
            if (!posts[i].isDeleted && posts[i].author == _author) {
                results[i] = posts[i];
            }
        }
        return results;
    }
}