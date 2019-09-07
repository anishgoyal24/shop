# |  Shop App
### ✌️ Welcome to Shop App dev team!  😀  

##  !!! - Waiting for documentation


####  Make sure to read all the guidelines before start working


## | Index: 
1. Installing and Running the Application using !!!Dev
2. Installing and Running the Application using !!!Deployement
3. Contribution rules
4. Server deployment and run

---

## 3. Contribution Rules


### Never work on `master` branch!


### Create a new branch for each set of related bugs or set of related tasks, naming by:


####  `type_CapitalizedName`, example: `bugfix_EditPostContent`.


*(**types:** `bugfix`, `feature`)*


**💻 command:** `git checkout -b bugfix_FormatPostContent`


**⚠️ Important: **

*  Before creating a branch, check if someone already started to work on this task and if there's already a branch created for this task, and if there is, **please fetch the branch with the command**:

**💻 command:** `git fetch origin bugfix_FormaPostContent:bugfix_FormatPostContent`

* Right after creating a new branch, push it to remote to make it available for everyone, defining the upstream.

**💻 command:** `git push -u origin bugfix_FormatPostContent`


### Everyday BEFORE start working, pull the remote branch updates to your local branch.


**⚠️ Important:** *make sure you're on the correct branch...*

**💻 command:** `git checkout bugfix_FormatPostContent`

*... and run ...*

**💻 command:** `git pull`


### Everyday AFTER resume working, push your local branch updates to remote branch.


**⚠️ Important:** *make sure you're on the correct branch...*

**💻 command:** `git checkout bugfix_FormatPostContent`

*... and run ...*

**💻 command:** `git push`


### *"... Ok! ... I've finished the task, what now? ..."* 

##  

#### *⚠️ ...Please follow these rules to have your work ready to deploy:*

##  

#### *1. Update your local `master` branch and rebase the branch you was working:*

1.1. Checkout to master:

`git checkout master`

1.2. Pull the updates:

`git pull`

1.3. Checkout to the branch you was working on:

`git checkout bugfix_FormatPostContent`

1.4. Rebase this branch:

`git rebase master`


**⚠️ Important:** 

*If there's more people working on this branch, let them know you're rebasing.*

*Conflicts may occur, and it must be resolved on this branch!*

*The developer is responsible to resolve conflicts and test it on the current branch to make sure the branch is ready and safe to be merged!*

##  


#### 2. Test the app and your work again!

##  


#### 3. Go to BitBucket and open a Pull Request, the admin will finish the job!


**⚠️ Important:** 

*Let people know you're opening this pull request.*


**⚠️ Tip:** 

If you finished working on this branch forever, and you've noticed that the branch was  already closed on remote, it makes sense to delete this branch locally:

`git branch -d bugfix_FormatPostContent`


### Are you going back to work on a branch you've created some time ago? Let's make it ready to work again!


#### 1. Make sure your `master` branch is updated:

`git checkout master`

`git pull`


#### 2. Update this branch you're gonna work (someone could've been working on this branch):

`git checkout feature_ThatOldFeature`

`git pull`


#### 3. Rebase the branch you're getting back to work:

`git checkout feature_ThatOldFeature`

`git rebase master`


**⚠️ Important:** 

*If there's more people working on this branch, let them know you're rebasing.*

*Conflicts may occur, and it must be resolved right now, before you get back working on the feature!*


#### 4. Push this updated branch state to remote:

`git push`

#### *... and then you're good to go!*

---

