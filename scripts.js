var scene = new THREE.Scene();

var count = 1;

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 200;


var renderer = new THREE.WebGLRenderer({ antialiasing: true });

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 100%)'), 1);
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 100%)'), 1);
fillLight.position.set(100, 0, 100);

var backLight = new THREE.DirectionalLight(0xffffff, 1);
backLight.position.set(100, 0, -100).normalize();

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);



function updateGroupGeometry( mesh, geometry ) {

      if ( geometry.isGeometry ) {
            geometry = new THREE.BufferGeometry().fromGeometry( geometry );
            // console.warn( 'THREE.GeometryBrowser: Converted Geometry to BufferGeometry.' );
      }

      mesh.children[ 0 ].geometry.dispose();
      mesh.children[ 1 ].geometry.dispose();

      mesh.children[ 0 ].geometry = new THREE.WireframeGeometry( geometry );
      mesh.children[ 1 ].geometry = geometry;

      // these do not update nicely together if shared
}

var gui = new dat.GUI();

var guis = {

      TextGeometry: function ( mesh ) {


            var data = {
                  text: "Sell-out",
                  size: 16,
                  height: 2,
                  curveSegments: 12,
                  font: "helvetiker",
                  weight: "regular",
                  bevelEnabled: false,
                  bevelThickness: 1,
                  bevelSize: 0.5,
                  bevelOffset: 0.0,
                  bevelSegments: 3
            };

            if (count == 2) {
                  data.text = "$60.000";
                  data.size = 14;  
                  data.height = 1; 
            }

            var fonts = [
                  "helvetiker",
                  "optimer",
                  "gentilis",
                  "droid/droid_serif"
            ];

            var weights = [
                  "regular", "bold"
            ];            


            function generateGeometry() {

                  var loader = new THREE.FontLoader();

                  loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {
                  // loader.load( 'fonts/optimer_regular.typeface.json', function ( font ) {


                        var geometry = new THREE.TextGeometry( data.text, {
                              font: font,
                              size: data.size,
                              height: data.height,
                              curveSegments: data.curveSegments,
                              bevelEnabled: data.bevelEnabled,
                              bevelThickness: data.bevelThickness,
                              bevelSize: data.bevelSize,
                              bevelOffset: data.bevelOffset,
                              bevelSegments: data.bevelSegments
                        } );

                        geometry.center();

                        updateGroupGeometry( mesh, geometry );

                  } );
            }

            //Hide the wireframe
            mesh.children[ 0 ].visible = false;


            var folder = gui.addFolder( 'Text Geometry '+ count + ' :' );
            count = count + 1;
            folder.add( data, 'text' ).onChange( generateGeometry );
            folder.add( data, 'size', 1, 60 ).onChange( generateGeometry );
            folder.add( data, 'height', 1, 20 ).onChange( generateGeometry );
            folder.add( data, 'curveSegments', 1, 20 ).step( 1 ).onChange( generateGeometry );
            folder.add( data, 'font', fonts ).onChange( generateGeometry );
            folder.add( data, 'weight', weights ).onChange( generateGeometry );
            folder.add( data, 'bevelEnabled' ).onChange( generateGeometry );
            folder.add( data, 'bevelThickness', 0.1, 3 ).onChange( generateGeometry );
            folder.add( data, 'bevelSize', 0, 3 ).onChange( generateGeometry );
            folder.add( data, 'bevelOffset', - 0.5, 1.5 ).onChange( generateGeometry );
            folder.add( data, 'bevelSegments', 0, 8 ).step( 1 ).onChange( generateGeometry );

            generateGeometry();
      }
}


function chooseFromHash( mesh ) {

      var selectedGeometry =  "TextGeometry";

      if ( guis[ selectedGeometry ] !== undefined ) {

            guis[ selectedGeometry ]( mesh );

      }

      return {fixed: true};

}

// Group 1 Start
var group = new THREE.Group();

var geometry = new THREE.BufferGeometry();
geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( [], 3 ) );

var lineMaterial = new THREE.LineBasicMaterial( { color: 0xffffff, transparent: true, opacity: 0.5 } );
var meshMaterial = new THREE.MeshPhongMaterial( { color: 0x156289, emissive: 0x072534, side: THREE.DoubleSide, flatShading: true } );

group.add( new THREE.LineSegments( geometry, lineMaterial ) );
group.add( new THREE.Mesh( geometry, meshMaterial ) );

var options = chooseFromHash( group );

var color_set = {
      color_text: 0x156289
};

var folder1 = gui.addFolder( 'Text color:' );
var controllerColor =  folder1.addColor(color_set, 'color_text');  


scene.add( group );


controllerColor.onChange(function( value ){
     group.children[ 1 ].material.color.setHex( value );
});

group.position.y += 80;
// Group 1 End


// Group 2 Start
var group2 = new THREE.Group();

var geometry = new THREE.BufferGeometry();
// geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( [], 3 ) );

// var lineMaterial = new THREE.LineBasicMaterial( { color: 0xffffff, transparent: true, opacity: 0.5 } );
var meshMaterial2 = new THREE.MeshPhongMaterial( { color: 0x2F4F4F, emissive: 0x072534, side: THREE.DoubleSide, flatShading: true } );


group2.add( new THREE.LineSegments( geometry, lineMaterial ) );
group2.add( new THREE.Mesh( geometry, meshMaterial2 ) );

var options = chooseFromHash( group2 );

var color_set2 = {
      color_text2: 0x2F4F4F
};

var folder2 = gui.addFolder( 'Text color 2 :' );
var controllerColor2 =  folder2.addColor(color_set2, 'color_text2');  


scene.add( group2 );


controllerColor2.onChange(function( value ){
     group2.children[ 1 ].material.color.setHex( value );
});

group2.position.y += 60;
// Group 1 End




scene.background = new THREE.Color( 'white' );

var mtlLoader = new THREE.MTLLoader();


mtlLoader.setResourcePath('assets/shelby-ford-mustang/');
mtlLoader.setPath('assets/shelby-ford-mustang/');
mtlLoader.load('shelby-ford-mustang.mtl', function (materials) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('assets/shelby-ford-mustang/');
    objLoader.load('shelby-ford-mustang.obj', function (object) {

        scene.add(object);
        object.position.y -= 60;


    });

});

var animate = function () {
      requestAnimationFrame( animate );
      controls.update();
      renderer.render(scene, camera);
};

animate();