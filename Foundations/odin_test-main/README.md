READ ME

Practice for Git version control using the Odin Project. 
Steps for this were to create the repo in github. Using terminal, the local
machine was able to connect to it using an SSH url. Files were added in 
terminal and edited in text editor.

1. Create Repo
2. Connect repo to git: 
	git clone git@github.com:USER-NAME/REPOSITORY-NAME.git. 
3. Create files:
	touch README.md
	touch hello_world.txt
4. Edit files
5. Add files to staging area (waiting area)
	git add README.md OR
	git add . to add all files in cd to staging area
	git add -A adds all UNSTAGED files to staging area within the repo
6. Commit files to branch:
	git commit -m "Add README.md"
7. Check work with git log
8. Push to main branch
	git push origin main
