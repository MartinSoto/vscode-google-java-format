FROM martinsoto/devshell-python

RUN echo 'if [ -f ~/hosthome/.devshell/init.sh ]; then source ~/hosthome/.devshell/init.sh; fi' >> /root/.bashrc

RUN export DEBIAN_FRONTEND=noninteractive \
    && apt-get update \
    && apt-get -y install \
    openjdk-11-doc \
    openjdk-11-jdk \
    unzip

RUN export DEBIAN_FRONTEND=noninteractive \
    && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" > /etc/apt/sources.list.d/yarn.list \
    && apt-get update \
    && apt-get -y install yarn

# Install Yeoman and make it possible for root to use it (https://github.com/yeoman/yo/issues/348#issuecomment-220369719).
RUN yarn global add yo generator-code \
    && yarn cache clean \
    && sed -i -e '/rootCheck/d' /usr/local/share/.config/yarn/global/node_modules/yo/lib/cli.js
