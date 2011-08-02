UUID=app-workspaces@ross.burton.intel.com
VERSION=0.1
NAME=gnome-shell-app-workspaces

all: metadata

metadata:
	@echo Generating metadata.json
	@sed -e 's|@VERSION@|${VERSION}|' 	\
	     -e 's|@UUID@|${UUID}|'		\
	< metadata.json.in \
	> metadata.json

# Install for a single user
install-local: all
	mkdir --parents ${HOME}/.local/share/gnome-shell/extensions/${UUID}
	cp extension.js metadata.json ${HOME}/.local/share/gnome-shell/extensions/${UUID}

# Install for all users
install: all
	mkdir --parents ${DESTDIR}/usr/share/gnome-shell/extensions/${UUID}
	cp extension.js metadata.json ${DESTDIR}/usr/share/gnome-shell/extensions/${UUID}

tag:
	git tag -a -m "${VERSION}" ${VERSION}

dist: all
	git archive --format=tar --prefix=${NAME}-${VERSION}/ HEAD | gzip > ${NAME}-${VERSION}.tar.gz
